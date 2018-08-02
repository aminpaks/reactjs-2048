import { cleanNulls, getTile, moveTilesToSide } from './tile';

describe('Tile', () => {
  it('cleanNulls()', () => {
    const result = cleanNulls([
      null,
      null,
      getTile({ value: 2 }),
      getTile({ value: 1 }),
    ]);
    expect(result[0]!.value).toBe(2);
    expect(result[1]!.value).toBe(1);
  });

  it('moveTilesToSide to left', () => {
    const result = moveTilesToSide(
      [getTile({ value: 2 }), null, getTile({ value: 4 }), null],
      'left',
    );
    expect(result[0]!.value).toBe(2);
    expect(result[1]!.value).toBe(4);
    expect(result[2]).toBeNull();
    expect(result[3]).toBeNull();
  });

  it('moveTilesToSide to right', () => {
    const result = moveTilesToSide(
      [getTile({ value: 2 }), null, getTile({ value: 4 }), null],
      'right',
    );
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
    expect(result[2]!.value).toBe(2);
    expect(result[3]!.value).toBe(4);
  });

  it('moveTilesToSide to right and sum up', () => {
    const result = moveTilesToSide(
      [getTile({ value: 4 }), null, getTile({ value: 4 }), null],
      'right',
    );
    expect(result[0]).toBeNull();
    expect(result[1]).toBeNull();
    expect(result[2]).toBeNull();
    expect(result[3]!.value).toBe(8);
  });
});
