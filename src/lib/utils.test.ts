import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });

  it("should ignore falsy values", () => {
    const result = cn("base-class", false, null, undefined, "valid-class");
    expect(result).toBe("base-class valid-class");
  });

  it("should handle conflicting tailwind classes", () => {
    // twMerge should keep the last class when there are conflicts
    const result = cn("px-4", "px-8");
    expect(result).toBe("px-8");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["px-4", "py-2"], "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      "text-red-500": true,
      "text-blue-500": false,
      "font-bold": true,
    });
    expect(result).toBe("text-red-500 font-bold");
  });

  it("should return empty string for no arguments", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
