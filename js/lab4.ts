export {};

function randomInteger(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const printResult = (number: number, expr: () => void): void => {
    console.log(` #${number}`);
    expr();
    console.log("\n");
}

printResult(1, () => {
    const array = ['Привет, ', 'мир', '!'];
    let str = "";
    array.forEach(x => str += x);
    console.log(str);
});

printResult(2, () => {
    const array = ['Привет, ', 'мир', '!'];
    array[0] = 'Пока, ';
    console.log(array);
});

printResult(3, () => {
    const str = '023m0df0dfg0';
    const array: number[] = [];
    [...str].forEach((c, i) => {
        if (c === '0') {
            array.push(i);
        }
    });
    console.log(array);
});

printResult(4, () => {
    const arr1 = Array.from({ length: 11 }, () => randomInteger(0, 100));
    console.log(arr1);

    const arr2 = arr1.filter(x => x.toString().includes('5'));
    console.log(arr2);
});

printResult(5, () => {
    function mergeArrays(arr1: number[], arr2: string[]): (number | string)[] {
        const result: (number | string)[] = [];
        if (arr1.length === arr2.length) {
            for (let i = 0; i < arr1.length; ++i) {
                result.push(arr1[i], arr2[i]);
            }
        }
        return result;
    }

    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];
    const res = mergeArrays(arr1, arr2);

    console.log(arr1);
    console.log(arr2);
    console.log(res);
});

printResult(6, () => {
    const arr1 = Array.from({ length: 11 }, () => randomInteger(0, 100));
    console.log(arr1);

    arr1.sort((a, b) => b - a);
    console.log(arr1);
});

printResult(7, () => {
    const ru = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
    const en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    ru.sort();
    en.sort();

    console.log(ru);
    console.log(en);
});

printResult(8, () => {
    const arr = ['orange', 'red', 'green', 'blue'];
    arr.sort((s1, s2) => s2.length - s1.length);
    console.log(arr);
});

printResult(9, () => {
    const arr = Array.from({ length: 9 }, () => randomInteger(0, 50));
    console.log(arr);

    const dividend = arr.slice(0, 4).reduce((a, b) => a + b, 0);
    const divisor = arr.slice(4).reduce((a, b) => a + b, 0);
    const result = dividend * divisor;

    console.log(dividend);
    console.log(divisor);
    console.log(result);
});

printResult(10, () => {
    const arr = Array.from({ length: 11 }, () => randomInteger(-100, 100));
    console.log(arr);

    const negCount = arr.filter(x => x < 0).length;
    console.log(negCount);
});

printResult(11, () => {
    let arr = Array.from({ length: 11 }, () => randomInteger(-50, 50));
    console.log(arr);

    arr = arr.filter(x => !(x < 0 || x % 2 === 1));
    console.log(arr);
});

printResult(12, () => {
    const str = "v3ni v1d1 v1c1";
    let first = 0;
    let last = 0;
    let isFirst = true;

    [...str].forEach((x, i) => {
        if (!isNaN(Number(x))) {
            if (isFirst) {
                first = i + 1;
                isFirst = false;
            } else {
                last = i + 1;
            }
        }
    });

    console.log(str);
    console.log(first);
    console.log(last);
});

