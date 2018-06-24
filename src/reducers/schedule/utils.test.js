import { mergeAscendingArrays } from './utils';

const ar1 = [1, 3, 5];
const ar2 = [2, 4, 20, 40];
const result = mergeAscendingArrays (ar1, ar2);

test ('The resultant array is ascending', () => {
    expect (result).toEqual([...result].sort((a, b) => a - b))
});

test ('No element is lost while merging', () => {
    expect (result.length).toEqual(ar1.length + ar2.length)
});

test ('First element is the smallest number', () => {
    expect (result[0]).toEqual(Math.min(...ar1, ...ar2))
});

test ('Last element is the largest number', () => {
    expect (result[result.length - 1]).toEqual(Math.max(...ar1, ...ar2))
});