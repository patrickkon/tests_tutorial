const {capitalize}  = require("./project1.js");

it("can capitalize",  () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize(1)).toBe(1);
    expect(capitalize("G")).toBe("G");
    expect(capitalize("whatsup")).toBe("Whatsup");
})

