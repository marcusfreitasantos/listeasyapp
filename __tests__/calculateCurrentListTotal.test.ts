import { calculateCurrentListTotal } from "../src/utils/calculateCurrentListTotal";
import { ListItemType } from "../src/features/listsManager/model/list";

describe("calculateCurrentListTotal", () => {
  it("should return 0 for an empty list", () => {
    const result = calculateCurrentListTotal([]);
    expect(result).toBe(0);
  });

  it("should calculate total correctly for a single item", () => {
    const items: ListItemType[] = [
      {
        id: "1",
        name: "Item 1",
        price: 10,
        quantity: 2,
        details: "",
      },
    ];
    const result = calculateCurrentListTotal(items);
    expect(result).toBe(20);
  });

  it("should calculate total correctly for multiple items", () => {
    const items: ListItemType[] = [
      {
        id: "1",
        name: "Item 1",
        price: 10,
        quantity: 2,
        details: "",
      },
      {
        id: "2",
        name: "Item 2",
        price: 5,
        quantity: 3,
        details: "",
      },
    ];
    const result = calculateCurrentListTotal(items);
    expect(result).toBe(35); // 20 + 15
  });

  it("should handle decimal prices", () => {
    const items: ListItemType[] = [
      {
        id: "1",
        name: "Item 1",
        price: 10.5,
        quantity: 2,
        details: "",
      },
    ];
    const result = calculateCurrentListTotal(items);
    expect(result).toBe(21);
  });

  it("should handle quantity of 0", () => {
    const items: ListItemType[] = [
      {
        id: "1",
        name: "Item 1",
        price: 10,
        quantity: 0,
        details: "",
      },
    ];
    const result = calculateCurrentListTotal(items);
    expect(result).toBe(0);
  });
});
