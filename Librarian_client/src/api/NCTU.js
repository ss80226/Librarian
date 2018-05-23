import axios from 'axios';
import uuid from 'uuid/v4';

// Develop server URL
const BaseUrl = 'http://localhost:8080/api/NCTU';

// Staging server URL
// const BaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api/NTHU';

export function getBookNCTU(searchText, type) {
    // For test
    //type=0;
    //searchText='123';

    if (!searchText || !searchText.trim()) {
        console.error("(NTHU) Error getting book - searchText cannot be empty.");
        return;
    }
    let url = `${BaseUrl}`;
    if (type==="isbn")
        url+="/ISBN?searchText=";
    else
        url+="/book?searchText=";
    url+=encodeURIComponent(searchText);

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        const titleFlag = "var title = "
        const authorFlag = "<td class=td1  width=\"15%\" valign=top>";
        const locationFlag = "sub_library=";

        let data = res.data.html, result=[];

        let i=0;
        let idx = data.indexOf(titleFlag);
        while (idx!==-1) {
            result[i] = {
                id: uuid()
            };

            /* Get title, Expected format: var title = '...'; */
            let subStr = '', j;
            data = data.slice(idx+titleFlag.length+1); // Bad efficiency...
            let next = data.indexOf(titleFlag);
            for (j=0; j<data.length; j++) {
                // Filter special char.
                let c = data.charAt(j);
                if (c==='&') {
                    j+=5;
                    subStr+=' ';
                    continue;
                } else if (c==='\'') {
                    break;
                }
                subStr+=c;
            }
            subStr=strTrim(subStr);
            result[i]['bookName'] = subStr;
            //console.log("BookName =",subStr);

            /* Get author, Expected format: <td   width=\"15%\" valign=top>....<td/> */
            subStr=''
            j = data.indexOf(authorFlag);
            if (j!==-1 && !(next!==-1 && j>next)) {
                j+=authorFlag.length;
                for (; j<data.length; j++) {
                    // Filter special char.
                    let c = data.charAt(j);
                    if (c==='<') {
                        break;
                    }
                    subStr+=c;
                }
                if (subStr[0]==='/')
                    subStr = subStr.slice(1);
                subStr=strTrim(subStr);
                result[i]['author'] = subStr;
                //console.log("Author =",subStr);
            }

            /* Get location, Expected format: <a sub_library=NTHU>....<a/> */
            subStr='';
            j = data.indexOf(locationFlag);
            if (j===-1 || (next!==-1 && j>next)) {
                // Library does not have this book, filter it.
                idx=next;
                result.pop();
                continue;
            }
            for (; j<data.length && data.charAt(j)!=='>'; j++);
            j++;
            while (data.charAt(j)!=='<') {
                subStr+=data.charAt(j);
                j++;
            }

            let temp = subStr.indexOf("(");
            if (temp!=-1) {
                result[i]['status'] = "館藏/借出 - " + subStr.slice(temp);
                subStr = subStr.slice(0,temp);
            }
            result[i]['location'] = "國立交通大學圖書館 - "+subStr;
            //console.log("Location =",subStr);

            j = data.indexOf(locationFlag,j);
            if (j!==-1 && next!==-1 && j<next) {
                /* Special case: Two location */
                subStr='';
                result[i+1] = {
                    id: uuid(),
                    bookName: result[i].bookName,
                    author: result[i].author,
                };
                for (; j<data.length && data.charAt(j)!=='>'; j++);
                j++;
                while (data.charAt(j)!=='<') {
                    subStr+=data.charAt(j);
                    j++;
                }

                temp = subStr.indexOf("(");
                if (temp!=-1) {
                    result[i+1]['status'] = "館藏/借出 - " + subStr.slice(temp);
                    subStr = subStr.slice(0,temp-1);
                }
                result[i+1]['location'] = "國立交通大學圖書館 - "+subStr;
                i++;
                //console.log("Location =",subStr);
            }

            i++;
            idx=next;
        }

        let temp = {
            data: result
        };
        console.log("NCTU result:");
        console.log(temp);

        return temp;
    });
}

function strTrim(str) {
    let banlist = ['/', ';', ':', ' ', ','], remove=true;
    while (remove) {
        remove=false;
        for (let c of banlist) {
            if (str && str[str.length-1]===c) {
                str = str.slice(0,-1);
                remove=true;
            }
        }
    }

    let idx=str.indexOf("&nbsp;");
    while (idx!==-1) {
        str = str.slice(0,idx) + ' ' + str.slice(idx+6);
        idx=str.indexOf("&nbsp;");
    }

    return str;
}
