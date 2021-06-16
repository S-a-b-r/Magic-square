const count = document.getElementById("count");
const table = document.getElementById("table");
count.addEventListener("input",()=>{
    let quant = count.value-0;
    let matrix = setMatrix(quant);
    let out = "";
    for(let i = 0; i<matrix.length;i++){
        out+="<tr>"
        for(let j = 0;j<matrix.length;j++){
            out+="<td>"+matrix[i][j]+"</td>";
        }
        out+="</tr>";
    }
    table.innerHTML = out;
    //console.log(matrix);
    console.log(testMatrix(matrix));
})

function setMatrix(quant){
    let matrix1 = [];
    let outMatrix = [];
    if(quant>=100){//Никому не нравятся виснущие сайты, верно?!
        return [[0]];
    }
    else if((quant) % 2 == 1){
        let l = Math.floor(quant/2);
        for(let i = 0; i<quant*2-1;i++){
            matrix1.push([]);
            for(let j = 0; j<quant*2-1; j++){
                matrix1[i].push(0);
            }
        }
        let a = 1;
        for(let i=0;i<matrix1.length;i++){
            for(let j=0; j< matrix1[i].length;j++){
                if(i + j == quant-1){
                    for(let k = 0; k<quant;k++){
                        matrix1[i+k][j+k] = a;
                        a++
                    }
                }
            }
        }
        for(let i=0; i< matrix1.length;i++){
            for(let j =0; j<matrix1[i].length;j++){
                if(i<l){
                    matrix1[i+quant][j] +=matrix1[i][j];
                }
                if(j<l){
                    matrix1[i][j+quant] += matrix1[i][j];
                }
                if(i>=quant+l){
                    matrix1[i-quant][j] += matrix1[i][j];
                }
                if(j>=quant+l){
                    matrix1[i][j-quant] += matrix1[i][j];
                }
            }
        }
        for(let i = 0; i<quant;i++){
            outMatrix.push([]);
            for(let j = 0; j<quant;j++){
                outMatrix[i].push(matrix1[i+l][j+l]);
            }
        }

    }
    else if(quant % 4 == 0){
        let l = quant / 2;
        for(let i = 0; i<quant*2-2;i++){
            matrix1.push([]);
            for(let j = 0; j<quant; j++){
                matrix1[i].push(0);
            }
        }
        let a = 1;
        for(let k = 0; k<l;k++){
            if(k % 2 == 0){
                for(let y = 0; y<l; y++){
                    matrix1[ k*2 + l - y - 1][y] = a;
                    a++;
                }
                for(let y = 0; y<l; y++){
                    matrix1[k*2+y][l+y] = a;
                    a++;
                }
                for(let y = 0; y<l; y++){
                    matrix1[k*2+l + y][quant-y-1] = a;
                    a++;
                }
                for(let y = 0; y<l;y++) {
                    matrix1[ l*2 + k * 2 - y - 1][quant - l - y - 1] = a;
                    a++;
                }
            }

            if(k % 2 == 1){
                for(let y = 0; y<l;y++){
                    matrix1[k*2+l-y-1][quant-y-1] = a;
                    a++
                }
                for(let y = 0; y<l;y++){
                    matrix1[k*2+y][quant-y-l-1] = a;
                    a++;
                }
                for(let y = 0; y<l;y++){
                    matrix1[2*k+l+y][y] = a;
                    a++;
                }
                for(let y = 0; y<l;y++){
                    matrix1[2*k+2*l-y-1][quant+y-l] = a;
                    a++;
                }
            }
        }
        for(let i=0;i<l-1;i++){
            for(let j = 0; j<quant;j++){
                matrix1[i+quant][j]+= matrix1[i][j];
            }
        }
        for(let i=quant+l-1;i<matrix1.length;i++){
            for(let j = 0; j < quant;j++){
                matrix1[i-quant][j] += matrix1[i][j];
            }
        }

        for(let i = 0; i<quant;i++) {
            outMatrix.push([]);
            for (let j = 0; j < quant; j++) {
                outMatrix[i].push(matrix1[i + l - 1][j])
            }
        }
    }
    else if(quant % 4 == 2){
        const l = quant/2;
        for(let i = 0; i < quant; i++){
            matrix1.push([]);
            for(let j = 0; j < quant; j++){
                matrix1[i].push(0);
            }
        }
        let matrix2 = setMatrix(l);
        for(let i = 0; i < l;i++){
            for(let j=0;j<l;j++){
                matrix1[i][j] = matrix2[i][j];
                matrix1[i+l][j] = matrix2[i][j] + l*l*3;
                matrix1[i][j+l] = matrix2[i][j] + l*l*2;
                matrix1[i+l][j+l] = matrix2[i][j] + l*l;
            }
        }
        let gl = matrix1[0][0];
        matrix1[0][0] = matrix1[l][0];
        matrix1[l][0] = gl;
        gl = matrix1[l-1][0];
        matrix1[l-1][0] = matrix1[quant-1][0];
        matrix1[quant-1][0] = gl;
        for(let i = 1; i<l-1;i++){
            let gl = matrix1[i][1];
            matrix1[i][1] = matrix1[i+l][1];
            matrix1[i+l][1] = gl;
        }
        for(let i = 0; i<l;i++){
            for(let j = l-Math.floor(quant/4 - 1);j<l+Math.floor(quant/4-1);j++){
                let gl = matrix1[i][j];
                matrix1[i][j] = matrix1[i+l][j];
                matrix1[i+l][j] = gl;
            }
        }
        outMatrix = matrix1;
    }
    return outMatrix;
}

function testMatrix(matrix){
    let sum1 = [];
    let sum2 = [];
    for(let i = 0; i<=matrix.length;i++){
        sum1[i] = 0;
        sum2[i] = 0;
    }
    for(let i = 0;i<matrix.length;i++){
        for( let j = 0;j<matrix.length;j++){
            sum1[i] += matrix[i][j];
            sum2[j] += matrix[i][j];
        }
    }
    for(let i = 0; i<matrix.length;i++){
        sum1[matrix.length] += matrix[i][i];
        sum2[matrix.length] += matrix[i][matrix.length-i-1];
    }
    for(let i = 0; i<sum1.length;i++){
        for(let j = 0; j<sum2.length;j++){
            if(sum1[i]!=sum2[j]){
                return [sum1,sum2];
            }
        }
    }
    return  true;
}