"""Turns the hangman_ext pack (opaque backgrounds, huge canvases) into game-ready sprites.
Per character: key out the background, align every pose on one shared canvas, crop,
scale to a consistent on-screen size, mirror if needed, speed up long attacks, write GIFs.
"""

import numpy as np, json, os, sys, shutil
from PIL import Image, ImageOps, ImageDraw
import os

D1 = "/home/claude/ext/"
D2 = "/home/claude/ext2/hangmansouls_ext2/"
D3 = "/home/claude/ext3/new/larry/"
OUT = "/home/claude/hangman-souls/"
SETS = [
    ("r1e1", D3, "undead", 0),
    ("r2e1", D1, "round2_enemy1", 0),
    ("r2e2", D1, "round2_enemy2", 0),
    ("r2e3", D1, "round2_enemy3", 0),
    ("b2", D1, "boss2", 1),
    ("r3e1", D1, "round3_enemy1", 0),
    ("r3e2", D1, "round3_enemy2", 0),
    ("r3e3", D1, "round3_enemy3", 0),
    ("r4e1", D1, "round4_enemy1", 0),
    ("r4e2", D1, "round4_enemy2", 0),
    ("b4", D1, "boss4", 1),
    ("r5e1", D1, "boss3", 1),  # Nyx (the old Round 3 boss) is now Round 5 enemy 1
    ("b3", D2, "boss3", 1),
    ("r4e3", D2, "round4_enemy3", 0),
    ("r5e2", D2, "round5_enemy2", 0),
    ("r5e3", D2, "round5_enemy3", 0),
    ("b5", D2, "boss5", 1),
]
SIZE_OVERRIDE = {
    "r3e1": 155,
    "b2": 200,
    "b3": 190,
    "b5": 170,
    "r5e3": 170,
    "r5e2": 150,
    "r4e3": 125,
}
GUIDES = {"r5e2"}
DEATH_SCALE = {"b2"}
NEAREST = {
    "r1e1"
}  # tiny pixel art: scaled by whole numbers so it stays crisp      # these sheets have a guide rectangle drawn into every frame
FLIP = json.load(open("flips.json")) if os.path.exists("flips.json") else {}
SIZE = {
    0: 112,
    1: 140,
}  # target idle height in sprite px (very wide creatures are sized by 0.45*width instead)
MAXATK = 2200
ATK_TARGET = 2000


def load(path, tol=3, extra=()):
    im = Image.open(path)
    fr = []
    du = []
    bg = np.array(im.convert("RGB").getpixel((2, 2)))
    for i in range(im.n_frames):
        im.seek(i)
        a = np.array(im.convert("RGB"))
        du.append(im.info.get("duration", 100))
        d = np.abs(a.astype(int) - bg).max(axis=2)
        for c in extra:
            d = np.minimum(d, np.abs(a.astype(int) - np.array(c)).max(axis=2))
        al = np.where(d <= tol, 0, 255).astype(np.uint8)
        fr.append(np.dstack([a, al]))
    return fr, du


def guide_colors(path):
    im = Image.open(path)
    im.seek(0)
    a = np.array(im.convert("RGB"))
    bg = a[2, 2]
    out = []
    flat = a.reshape(-1, 3)
    cols, cnt = np.unique(flat, axis=0, return_counts=True)
    for c, n in zip(cols, cnt):
        if (c == bg).all() or n < 200:
            continue
        m = (a == c).all(axis=2)
        if max(m.sum(axis=1).max(), m.sum(axis=0).max()) >= 250:
            out.append(tuple(int(v) for v in c))
    return out


def dissolve(base, n=14, seed=7):
    rng = np.random.default_rng(seed)
    noise = rng.random(base.shape[:2])
    fr = []
    for i in range(n):
        f = base.copy()
        t = i / (n - 1)
        dy = int(i * 1.2)
        if dy:
            f = np.roll(f, -dy, axis=0)
            f[-dy:, :, 3] = 0
        nz = np.roll(noise, -dy, axis=0) if dy else noise
        f[:, :, 3] = np.where(nz > t * 1.05, f[:, :, 3], 0)
        if i < 3:
            f[:, :, :3] = np.clip(
                f[:, :, :3].astype(int) * 0.7 + np.array([140, 40, 200]) * 0.3, 0, 255
            ).astype(np.uint8)
        fr.append(f)
    return fr


def bbox(a):
    ys, xs = np.nonzero(a[:, :, 3])
    return (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1) if len(xs) else None


def shift_match(ref, mov):
    """offset (dx,dy) so that mov placed at (dx,dy) overlaps ref best (coarse search; full resolution on tiny canvases)"""
    k = 1 if max(ref.shape[:2]) <= 160 else 4
    r = ref[::k, ::k, 3] > 0
    m = mov[::k, ::k, 3] > 0
    best = (1e9, 0, 0)
    rx, ry = (30, 20) if k == 1 else (120 // k, 40 // k)
    for dy in range(-ry, ry + 1, 1 if k == 1 else 2):
        for dx in range(-rx, rx + 1, 1 if k == 1 else 2):
            ys0, xs0 = max(0, dy), max(0, dx)
            ys1 = min(r.shape[0], m.shape[0] + dy)
            xs1 = min(r.shape[1], m.shape[1] + dx)
            if ys1 <= ys0 or xs1 <= xs0:
                continue
            rr = r[ys0:ys1, xs0:xs1]
            mm = m[ys0 - dy : ys1 - dy, xs0 - dx : xs1 - dx]
            sc = (rr ^ mm).sum() / max(1, rr.sum() + mm.sum())
            if sc < best[0]:
                best = (sc, dx * k, dy * k)
    return best[1], best[2]


def crop(a, off, box):
    x0, y0, x1, y1 = box
    out = np.zeros((y1 - y0, x1 - x0, 4), np.uint8)
    ox, oy = off
    sx0, sy0 = max(x0, ox), max(y0, oy)
    sx1, sy1 = min(x1, ox + a.shape[1]), min(y1, oy + a.shape[0])
    if sx1 > sx0 and sy1 > sy0:
        out[sy0 - y0 : sy1 - y0, sx0 - x0 : sx1 - x0] = a[
            sy0 - oy : sy1 - oy, sx0 - ox : sx1 - ox
        ]
    return out


def scale(a, s, nearest=False):
    if nearest:
        return np.array(
            Image.fromarray(a, "RGBA").resize(
                (a.shape[1] * s, a.shape[0] * s), Image.NEAREST
            )
        )
    im = Image.fromarray(a, "RGBA").convert("RGBa")
    w, h = im.size
    im = im.resize((max(1, round(w * s)), max(1, round(h * s))), Image.LANCZOS).convert(
        "RGBA"
    )
    return np.array(im)


def to_gif(frames, durs, path):
    ps = []
    for a in frames:
        al = a[:, :, 3] >= 128
        q = Image.fromarray(a[:, :, :3]).quantize(255, dither=Image.Dither.NONE)
        idx = np.array(q)
        idx[~al] = 255
        p = Image.fromarray(idx, "P")
        pal = q.getpalette()[:765]
        pal += [0] * (768 - len(pal))
        pal[765:768] = [0, 0, 0]
        p.putpalette(pal)
        ps.append(p)
    ps[0].save(
        path,
        save_all=True,
        append_images=ps[1:],
        duration=durs,
        loop=0,
        disposal=2,
        transparency=255,
        optimize=False,
    )


def png(a, path):
    Image.fromarray(a, "RGBA").save(path)


def build(key, d, src, boss):
    ex = guide_colors(f"{d}{src}_idle.gif") if key in GUIDES else ()
    has = lambda n: os.path.exists(f"{d}{src}_{n}.gif")
    idle, di = load(f"{d}{src}_idle.gif", extra=ex)
    poses = {"idle": idle}
    durs = {"idle": di}
    for n in ("attack", "death"):
        if has(n):
            poses[n], durs[n] = load(f"{d}{src}_{n}.gif", extra=ex)
    offs = {n: (0, 0) for n in poses}
    for (
        n,
        fr,
    ) in (
        poses.items()
    ):  # canvases of a different size: find where they sit relative to the idle canvas
        if n != "idle" and fr[0].shape != idle[0].shape:
            offs[n] = shift_match(idle[0], fr[0])
    cx = np.mean([(np.nonzero(f[:, :, 3])[1].mean()) for f in idle])
    ib = [bbox(f) for f in idle]
    base = max(b[3] for b in ib)
    iw = np.mean([b[2] - b[0] for b in ib])
    ih = np.mean([b[3] - b[1] for b in ib])
    mnx = mny = 1e9
    mxx = 0
    for n, fr in poses.items():
        ox, oy = offs[n]
        for f in fr:
            b = bbox(f)
            if b:
                mnx = min(mnx, b[0] + ox)
                mny = min(mny, b[1] + oy)
                mxx = max(mxx, b[2] + ox)
    W = int(max(cx - mnx, mxx - cx)) + 6
    box = (int(cx) - W, int(mny) - 6, int(cx) + W, int(base) + 1)
    if (
        "death" in poses
    ):  # a death drawn at another scale or on another canvas: match the idle body and stand it on the ground
        di0, dd0 = bbox(idle[0]), bbox(poses["death"][0])
        r = (di0[3] - di0[1]) / max(1, dd0[3] - dd0[1])
        fix = (
            key in DEATH_SCALE and abs(r - 1) > 0.12
        )  # Akatosh's death is drawn at ~80% of his idle scale
        if poses["death"][0].shape != idle[0].shape or fix:
            if fix:
                poses["death"] = [
                    np.array(
                        Image.fromarray(f, "RGBA").resize(
                            (
                                max(1, round(f.shape[1] * r)),
                                max(1, round(f.shape[0] * r)),
                            ),
                            Image.LANCZOS,
                        )
                    )
                    for f in poses["death"]
                ]
            f0 = poses["death"][0]
            b0 = bbox(f0)
            cx0 = np.nonzero(f0[:, :, 3])[1].mean()
            offs["death"] = (int(round(cx - cx0)), int(base - b0[3]))
        print(f"   [{key} death scale x{r:.2f}]", end="")
    s = SIZE_OVERRIDE.get(key, SIZE[boss]) / max(ih, 0.45 * iw)
    if key in NEAREST:
        s = max(1, round(s))
    print(
        f"   {key}: idle {iw:.0f}x{ih:.0f} -> {iw*s:.0f}x{ih*s:.0f}  poses={list(poses)}",
        end=" ",
    )
    res = {}
    for n, fr in poses.items():
        res[n] = [scale(crop(f, offs[n], box), s, key in NEAREST) for f in fr]
        if FLIP.get(key):
            res[n] = [
                np.array(ImageOps.mirror(Image.fromarray(f, "RGBA"))) for f in res[n]
            ]
    m = dict(
        poses=list(poses),
        size=list(res["idle"][0].shape[1::-1]),
        death="gif" if "death" in res else None,
    )
    if "attack" in res:
        T = sum(durs["attack"])
        if T > MAXATK:
            durs["attack"] = [
                max(3, round(ATK_TARGET / len(durs["attack"]) / 10)) * 10
            ] * len(durs["attack"])
        T = sum(durs["attack"])
        area = [(f[:, :, 3] > 0).sum() for f in res["attack"]]
        hi = int(np.argmax(area))
        hit = int(min(max((hi + 0.5) * durs["attack"][0], 0.3 * T), 0.6 * T))
        m.update(hitAt=hit, endAt=T + 100, sfxAt=max(0, hit - 120), atkMs=T)
        if "death" not in res:  # no death animation supplied: generate a pixel dissolve
            res["death"] = dissolve(res["idle"][0])
            durs["death"] = [100] * 14
            m["death"] = "dissolve"
    name = {"idle": "Idle", "attack": "Attack", "death": "Death"}
    for n in res:
        to_gif(res[n], durs[n], f"{OUT}img/{key}{name[n]}.gif")
    if m["death"] == "gif":
        png(res["death"][-1], f"{OUT}img/{key}Dead.png")
    if "death" in res:
        m["deathMs"] = sum(durs["death"])
    return m, res


if __name__ == "__main__":
    meta = {}
    prev = {}
    for key, d, src, boss in SETS:
        m, res = build(key, d, src, boss)
        meta[key] = m
        prev[key] = res
        print(key, m, "flip" if FLIP.get(key) else "")
    json.dump(meta, open("meta.json", "w"), indent=1)
    # preview sheet: idle / attack(hit frame) / death(mid) on mid-gray
    P = 150
    sheet = Image.new("RGB", (3 * P, len(SETS) * (P + 14)), (90, 90, 100))
    d = ImageDraw.Draw(sheet)
    for r, (key, _, _, _) in enumerate(SETS):
        for c, (pose, idx) in enumerate(
            (("idle", 0), ("attack", None), ("death", None))
        ):
            if pose not in prev[key]:
                continue
            fr = prev[key][pose]
            i = (
                idx
                if idx is not None
                else (
                    int(
                        np.argmax(
                            [(bbox(f)[2] - bbox(f)[0]) if bbox(f) else 0 for f in fr]
                        )
                    )
                    if pose == "attack"
                    else len(fr) // 2
                )
            )
            im = Image.fromarray(fr[i], "RGBA")
            k = min(1, (P - 4) / max(im.size))
            im = im.resize(
                (max(1, int(im.size[0] * k)), max(1, int(im.size[1] * k))),
                Image.NEAREST,
            )
            x, y = c * P, r * (P + 14)
            sheet.paste(im, (x + (P - im.size[0]) // 2, y + 14 + (P - im.size[1])), im)
        d.text((3, r * (P + 14) + 1), key, fill=(255, 255, 0))
    sheet.save("preview.png")
    print(sheet.size)
