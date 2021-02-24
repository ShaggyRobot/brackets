module.exports = function check(str, bracketsConfig) {
    cnt = 0; //counter to count brackets
    op = []; //list of opening brackets
    cl = []; //list of closing brackets
    uni = {}; //{'bracket': state} if state == false - bracket pair is opened

    for (let i = 0; i < bracketsConfig.length; i++) {
        //divide into opening, closing and unibrackets
        const pair = bracketsConfig[i];
        if (pair[0] === pair[1]) {
            uni[pair[0]] = true;
            continue;
        }
        op.push(pair[0]);
        cl.push(pair[1]);
    }

    brStr = str.split(""); // splitting string of brackets in to array

    for (let i = 0; i < brStr.length; i++) {
        const br = brStr[i];

        if (br in uni) {
            // bracket is unibracket
            uni[br] = !uni[br]; // change state of unibracket pair (opened/closed)

            switch (
                true // if there is opening bracket before current unibracket - sequense is incorrect
            ) {
                case op.includes(brStr[i - 1]) && uni[br]:
                    return false;

                case brStr[i - 1] in uni && // or unibracket of another type from opened pair
                    uni[br] != uni[brStr[i - 1]] &&
                    !uni[brStr[i - 1]]:
                    return false;
            }
        }

        if (op.includes(br)) {
            //current bracket is opening bracket
            cnt++; //incrementing the counter
            continue;
        }

        if (cl.includes(br)) {
            //current bracket is closing bracket
            if (
                //if there is opening bracket of another type before current - sequence is incorrect
                op.includes(brStr[i - 1]) &&
                op.indexOf(brStr[i - 1]) != cl.indexOf(br)
            ) {
                return false;
            }
            cnt--; //decrementing the counter
        }
        if (cnt < 0) {
            //if more brackets closed than opened - sequence is incorrect
            return false;
        }
    }

    return cnt === 0 ? true : false;
};
