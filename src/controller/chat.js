const fs = require('fs');

class RegistroChat{
    constructor(path){
        this.contenedor = [];
        this.path = path;
    }

    

    getAll() {
        try {
            this.contenedor = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch (err) {
            console.log('Error leyendo el archivo', err.message);
        }
        return this.contenedor;
    }

    save(obj){
        this.contenedor = this.getAll();
        this.contenedor.push(obj);
        const data = JSON.stringify(this.contenedor, '\t');

        try {
            fs.writeFileSync(this.path, data);
        }
        catch (err) {
            console.log('Error de escritura', err.message);
        }
    }
}

const registroChat = new RegistroChat('registroChat.txt');
module.exports=registroChat;