export function zip(...args) {
    if (args.length > 1) {
        return args[0].map((entry, i) => {
            const row = [entry];
            for (let j = 1; j < args.length; j++) {
                row.push(args[j][i]);
            }
            return row;
        });
    }
    else {
        args = args[0];
        const res = [];
        for (let i = 0; i < args.length; i++) {
            for (let j = 0; j < args[i].length; j++) {
                if (!res[j]) {
                    res.push([]);
                }
                res[j].push(args[i][j]);
            }
        }
        return res;
    }
}
