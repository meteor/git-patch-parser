import assert from "assert";
import fs from "fs";
import { parsePatch, parseMultiPatch } from "../src/index";

describe("Reading single patch", () => {
  it("Parses the example patch", () => {
    const contents = readFile("react.single.patch");

    // Make sure we got the file
    assert.ok(contents);

    const results = parsePatch(contents);

    // Ensure the metadata is correct
    assert.equal(results.sha, "ce86ff010f94a8a1cc2c8e6f9331df080565682b");
    assert.equal(results.message, "Step 3.2: Modify App component to get tasks from collection");

    const lines = results.files["App.jsx"].lines;

    // Ensure the line numbers parsed from the patch are correct
    assert.deepEqual(results.files["App.jsx"].lineNumbers, {
      removed: {
        start: 1,
        lines: 15
      },
      added: {
        start: 1,
        lines: 19
      }
    });

    // Ensure the line numbers parsed from the patch are correct
    assert.strictEqual(results.files["App.jsx"].lineNumbers.removed.start, 1);

    // Ensure the lines themselves are correct
    assert.deepEqual(lines[0], {
      type: "context",
      content: "// App component - represents the whole app"
    });

    assert.deepEqual(lines[2], {
      type: "removed",
      content: "  getTasks() {"
    });

    assert.deepEqual(lines[9], {
      type: "added",
      content: "  // This mixin makes the getMeteorData method work"
    });
  });
});

describe("Reading multi patch", () => {
  it("Parses the example patch", () => {
    const contents = readFile("react.multi.patch");

    // Make sure we got the file
    assert.ok(contents);

    const results = parseMultiPatch(contents);
  });
});

function readFile(filename) {
  return fs.readFileSync(filename, "utf8");
}
