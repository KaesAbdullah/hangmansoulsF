/* Load this after common.js and levels.js to check localization structure. */
(function () {
  const levels = window.HS && HS.LEVELS;
  if (!levels) throw new Error("Load common.js and levels.js first");
  const errors = [];
  if (levels.length !== 43)
    errors.push("Expected 43 fights; found " + levels.length);
  levels.forEach((level, index) => {
    const label = "Level " + (index + 1) + " (" + level.name + ")";
    if (!level.wordsEs) {
      errors.push(label + " has no Spanish word list");
      return;
    }
    const keys = Object.keys(level.wordsEs);
    if (!keys.length) errors.push(label + " has an empty Spanish word list");
    if (keys.length !== Object.keys(level.words).length) {
      errors.push(label + " has mismatched English/Spanish answer counts");
    }
    keys.forEach((key) => {
      if (!/^[A-Z]+$/.test(key))
        errors.push(label + " has invalid answer key " + key);
      if (!level.wordsEs[key] || typeof level.wordsEs[key] !== "string") {
        errors.push(label + " has a missing hint for " + key);
      }
    });
    if (level.speech && !level.speechEs)
      errors.push(label + " has no Spanish speech");
    if (level.deathSpeech && !level.deathSpeechEs) {
      errors.push(label + " has no Spanish death speech");
    }
    // The true form's scripted beats (transformation cutscene) must be paired too.
    ["transformSpeech", "surviveSpeech", "gynnSpeech", "resumeSpeech"].forEach(
      (key) => {
        if (level[key] && !level[key + "Es"])
          errors.push(label + " has no Spanish " + key);
        if (level[key + "Es"] && !level[key])
          errors.push(label + " has no English " + key);
      },
    );
    if (level.finalWords && keys.length < level.finalWords) {
      errors.push(
        label +
          " needs at least " +
          level.finalWords +
          " words for its true-form mechanic; found " +
          keys.length,
      );
    }
  });
  if (errors.length) {
    console.error(errors.join("\n"));
    return false;
  }
  console.info(
    "Spanish localization structure checks passed for " +
      levels.length +
      " fights.",
  );
  return true;
})();
