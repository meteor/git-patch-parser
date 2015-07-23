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
    assert.equal(results.sha, "f48c03507b9438ad4c1e9a48a2d5b82b1bd354ea");
    assert.equal(results.message, "Step 8.4: Modify App component to get tasks from collection");

    const lines = results.files["App.jsx"].lines;

    // Ensure the line numbers parsed from the patch are correct
    assert.deepEqual(results.files["App.jsx"].lineNumbers, {
      removed: {
        start: 12,
        lines: 9
      },
      added: {
        start: 12,
        lines: 16
      }
    });

    // Ensure the line numbers parsed from the patch are correct
    assert.strictEqual(results.files["App.jsx"].lineNumbers.removed.start, 12);

    // Ensure the lines themselves are correct
    assert.deepEqual(lines[0], {
      type: "context",
      content: ""
    });

    assert.deepEqual(lines[3], {
      type: "removed",
      content: "    return {"
    });

    assert.deepEqual(lines[5], {
      type: "added",
      content: "    let query = {};"
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
