async function fun(){
    // throw new Error('error');
    if(false){
        return true;

    }else{
        throw new Error('Error ............');
    }
}

(async function main() {
    try {
        console.log(await fun());
    } catch (error) {
        console.log(error);
    }    
})()