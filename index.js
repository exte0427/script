//sad
String.prototype.strcut = function(a,b){
    let returnSTR="";
    for(let i=a;i<=b;i++){
        returnSTR=returnSTR+this.charAt(i);
    }
    return returnSTR;
}

//code를 정의 하는곳
const codes=[];
const functions=[]
//명령어 읽는 곳
const fs = require('fs');
let tiasdoo=fs.readFileSync('./basicCommend.txt', 'utf8');
tiasdoo=tiasdoo.split("＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃\r\n");
for(let i=0;i<tiasdoo.length;i++){
    codes.push({"str":[],"datas":[]});
    let fdafsd=tiasdoo[i].split("\r\n\r\n");
    for(let j=0;j<fdafsd.length;j++){
        codes[i]["str"][j]=fdafsd[j].split("\r\n")[0];
        codes[i]["datas"][j]=fdafsd[j].split("\r\n")[1];
    }
}
//내장함수 읽는곳
let ttttt=fs.readFileSync('./basicFunction.txt', 'utf8');
ttttt=ttttt.split("＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃\r\n");
for(let i=0;i<ttttt.length;i++){
    functions.push({"str":ttttt[i].split("\r\n")[0].split(" = ")[0],"replaceStr":ttttt[i].split("\r\n")[0].split(" = ")[1],"functionis":ttttt[i].replace(ttttt[i].split("\r\n")[0],"")});
}
//컴파일러 생성
let ccccc=fs.readFileSync('./index.js', 'utf8');
ccccc=ccccc.split("\n");
let dfsdf="";
for(let i=0;i<ccccc.length;i++){
    let ddd=0;
    let pasd="";
    for(let j=0;j<ccccc[i].length;j++){
        if(ccccc[i].charAt(j)!=" "){ddd=1;}
        if(ddd==1){pasd=pasd+ccccc[i].charAt(j);}
    }
    if(pasd.charAt(pasd.length)!=";" && pasd.charAt(pasd.length)!="{" ){
        pasd=pasd;
    }
    dfsdf=dfsdf+"\n"+pasd;
}
const asdas="//필요한 함수를 불러오는 곳";
const sfdsds="//실행하는곳";
dfsdf=dfsdf.strcut(dfsdf.replace(asdas,"").indexOf(asdas)+14,dfsdf.replace(sfdsds,"").indexOf(sfdsds)+14);
//함수 로딩 추가
let strz="const functions=[";
for(let i=0;i<functions.length;i++){
    strz=strz+"{";
    //str
    strz=strz+"str:[";
    strz=strz+"`"+functions[i].str+"`],";
    //replacestr
    strz=strz+"replaceStr:[";
    strz=strz+"`"+functions[i].replaceStr+"`],";
    //functionis
    strz=strz+"functionis:[";
    strz=strz+"`"+functions[i].functionis+"`],";
    strz=strz+"},";
}
strz=strz+"];"
//기본 명령어 로딩 추가
let strzz="const codes=[";
for(let i=0;i<codes.length;i++){
    strzz=strzz+"{";
    //str
    strzz=strzz+"str:[";
    for(let j=0;j<codes[i].str.length;j++){
        strzz=strzz+"`"+codes[i].str[j]+"`,";
    }
    strzz=strzz+"],";
    //datas
    strzz=strzz+"datas:[";
    for(let j=0;j<codes[i].str.length;j++){
        strzz=strzz+"`"+codes[i].datas[j]+"`,";
    }
    strzz=strzz+"],";
    strzz=strzz+"},";
}
strzz=strzz+"];";
dfsdf=strz+strzz+dfsdf;
//압축
let dd=dfsdf.split("\r\n");
for(let i=0;i<dd.length;i++){
    if(dd[i].indexOf("//")!=-1){
        dd[i]=dd[i].strcut(0,dd[i].indexOf("//")-1);
    }
    if(dd[i].charAt(dd[i].length-1) != ";" && dd[i].charAt(dd[i].length-1)!="{"){
        if(dd[i+1]!=undefined){
            if(dd[i+1].startsWith("else")==0){
                dd[i]=dd[i]+";";
            }
        }
        else{
            dd[i]=dd[i]+";";
        }
    }
}
dd=dd.join("");
//end
fs.writeFile('./compiler.js', dd, 'utf-8', function(err, data) {
    if (err) throw err;
})
//필요한 함수를 불러오는 곳
String.prototype.strcut = function(a,b){
    let returnSTR="";
    for(let i=a;i<=b;i++){
        returnSTR=returnSTR+this.charAt(i);
    }
    return returnSTR;
}
String.prototype.index = function(a){
    let t=a.split(">");
    let str=this;
    let th;
    let first=-1;
    for(let i=0;i<t.length;i++){
        th=t[i].split("<")[0];
        if(first==-1){first=th}
        if(str.indexOf(th)!=-1){
            //str=str.replace(th,"");
        }
        else{
            return false;
        }
    }
    return [str.indexOf(first),str.indexOf(th)+th.length-1];
}
String.prototype.compare = function(a){
    let t=a.split(">");
    let str=this;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,"");
        }
        else{
            return false;
        }
    }
    return true;
}
String.prototype.data = function(a){
    let t=a.split(">");
    let str=this;
    for(let i=0;i<t.length;i++){
        const th=t[i].split("<")[0];
        if(str.indexOf(th)!=-1){
            str=str.replace(th,",");
        }
    }
    const str2=[];
    str.split(",").map(a=>{if(a!="" && a!=undefined){str2.push(a);}});
    if(str2.length==1){
        return str2[0];
    }
    else if(str2.length==0){
        return 0;
    }
    else{
        return str2;
    }
}
function spaceNum(str){
    let i;
    for(i=0;i<str.length;i++){
        if(str.charAt(i)!=" "){
            break;
        }
    }
    return i;
}

//컴파일 관련 함수를 불러오는곳
function stringdel(a){
    let code="";
    let o=0;
    for(let i=0;i<a.length;i++){
        if(str==undefined){
            str=[]
        }
        if(a.charAt(i)=="`"){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!="`";j++){}
            let returnSTR="";
            for(let i=first;i<=j;i++){
                returnSTR=returnSTR+a.charAt(i);
            }
            str.push(returnSTR.replace("<","${").replace(">","}"));
            code=code+"&*&*str"+o+"&*&*";
            o++;
            i=j;
        }else if(a.charAt(i)==`"`){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!=`"`;j++){}
            str.push(a.strcut(first,j).replace("<","${").replace(">","}"));
            code=code+"&*&*str"+o+"&*&*";
            o++;
            i=j;
        }
        else if(a.charAt(i)=="#"){
            let first=i;
            let j=0;
            for(j=first+1;a.charAt(j)!="\n";j++){
                if(j>=a.length){
                    break;
                }
            }
            i=j;
        }
        else{
            code=code+a.charAt(i);
        }
    }
    return code;
};
var str=[];
function decode(code){
    while(code.indexOf("&*&*str")!=-1){
        code=code.replace("&*&*str","ppppppppppdp");
        let i=code.strcut(code.indexOf("ppppppppppdp")+"ppppppppppdp".length,code.indexOf("&*&*")-1)*1;
        code=code.replace("ppppppppppdp"+i+"&*&*",str[i]);
    }
    return code;
}
function err(msg){throw new Error(msg);}
function run(data){
    let strs="";
    for(let i=0;i<functions.length;i++){
        strs=strs+functions[i].functionis+"\n";
    }
    eval(strs);
    return eval(decode(compiler(transform(stringdel(data)).split("\n"))));
}
function transform(data){
    data="\n"+data+"\n"
    let code=data.split("\n"); // 오류 방지용 앞 뒤 공백 배열 추가
    // "  "로 괄호 자동 추가
    let futurespace=0;
    for(let i=0;i<code.length-1;i++){
        futurespace=spaceNum(code[i+1]); //다음 space 수를 저장
        if(spaceNum(code[i])<futurespace){
            //괄호가 추가 되어야 하는 상태
            if(futurespace-2 == spaceNum(code[i])){
                //code[i]=code[i]+"{";
            }
            else{
                err("한번에 두번 괄호를 열 수 없습니다.");
            }
        }
        else if(spaceNum(code[i])!=futurespace){
            //괄호가 닫혀야 되는 상황
            const num=Math.ceil((spaceNum(code[i])-futurespace)/2);
            for(let j=0;j<num;j++){
                code[i]=code[i]+"\n}";
            }
        }
    }
    code=code.join("\n");code=code.split("\n"); // code[i]=code[i]+"\n}" 에서 추가한 \n을 배열로 만듬
    code=code.map(a=>a.strcut(spaceNum(a),a.length)); // 코드에 space를 제거
    return code.join("\n");
}
function compiler(a){
    for(let i=0;i<a.length;i++){
        if(a[i]==""){
            a.splice(i,1);
            i--;
        }
    }
    let returnCode="";
    //--------------------------------------------------------------------------------------------------------------------------
    for(let i=0;i<a.length;i++){
        let returns="";
        let br=0;
        for(let j=0;j<codes.length;j++){
            for(let pp=0;pp<codes[j].str.length;pp++){
                if(a[i].compare(codes[j].str[pp])){
                    let d=a[i].data(codes[j].str[pp]);
                    if(typeof d != "object"){
                        d=[d];
                    }
                    let c=codes[j].datas[pp].split("@last")[0];
                    while(c.indexOf("<data")!=-1){
                        let o=d[c.strcut(c.indexOf("<data")+5,c.indexOf(">")-1)*1-1];              
                        c=c.replace("<data"+c.strcut(c.indexOf("<data")+5,c.indexOf(">")-1),"");
                        c=c.replace(">",operator(o));
                    }
                    returns=c;
                    br=1;
                    if(codes[j].datas[pp].split("@last").length>1){
                        let t=codes[j].datas[pp].split("@last")[1];
                        let stroo="";
                        let ok=0;
                        for(let oo=i;oo<a.length;oo++){
                            ok++;
                            stroo=stroo+"\n"+a[oo];
                        }
                        stroo=stroo.replace("\n","").split("\n");
                        let index="";
                        stroo.map(a=>{
                            if(a.indexOf("}")!=-1){
                                index=a;
                            }
                        });
                        if(index==""){
                            index=stroo.length;
                        }
                        else{
                            index=stroo.indexOf(index);
                        }
                        a[index-1+ok]=a[index-1+ok]+"\n"+t;
                        let op=[];
                        a.map(a=>{
                            a=a.split("\n");
                            for(let i=0;i<a.length;i++){
                                if(a[i]=="undefined"){
                                    op.push("");
                                }
                                else{
                                    op.push(a[i]);
                                }
                            }
                        });
                    }
                    break;
                }
                //if(br==1){break;}
            }
            if(br==1){break;}
        }
        if(br==0){
            returns=operator(a[i]);
        }
        returnCode=returnCode+"\n"+returns;
    }
    returnCode=returnCode.replace("\n","");
    return returnCode;
}
function operator(dt){
    for(let i=0;i<functions.length;i++){
        if(dt.compare(functions[i].str)==true){
            while(true){
                if(dt.compare(functions[i].str)!=true){
                    break;
                }
                let strr=functions[i].replaceStr;
                let s=1;
                while(true){
                    if(strr.indexOf("<data")==-1){
                        break;
                    }
                    strr=strr.replace("<data"+s+">",dt.data(functions[i].str)[s]);
                    s++;
                }
                dt=dt.replace(dt.strcut(dt.index(functions[i].str)[0],dt.index(functions[i].str)[1]),strr);
            }
        }
    }
    let str=dt;
    let str2="";
    str=str.split("^").join("**");
    str=str.split("!").join(" not ");
    str=str.split(" ");
    // rev(rev(a)+rev(b))
    for(let i=0;i<str.length;i++){
        if(str[i]=="or"){
            str2=str2+" || ";
        }else if(str[i]=="and"){
            str2=str2+" && ";
        }else if(str[i]=="and"){
            str2=str2+" && ";
        }else if(str[i]=="is"){
            str2=str2+" == ";
        }else if(str[i]=="not"){
            if(str2.indexOf(" ! ")==-1){
                str2=str2+" ! ";
            }else{
                str2=str2.replace(" ! ","");
            }
        }
        else{
            str2=str2+` ${str[i]} `;
        }
    }
    return str2;
}
//실행하는곳
run(`
oo
`);