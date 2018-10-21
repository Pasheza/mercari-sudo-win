

export const greenCodes = [104];

export const yellowCodes = [101, 103, 105];

export const redCodes = [100, 102];

export const getAnalyzerInfo = code => {
    switch (code) {
        case 100:
            return 'This picture is dark and blurry.';
        case 101:
            return 'This picture is blurry.';
        case 102:
            return 'This picture is bright and blurry.';
        case 103:
            return 'This picture is dark.';
        case 104:
            return 'This is perfect picture.';
        case 105:
            return 'Thie picture is bright.'
    }
};