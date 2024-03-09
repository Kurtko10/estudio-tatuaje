import { error } from "console";
import app  from "./app";
import { dataSource } from "./database/data-source";

//-----------

const PORT = 3010;

dataSource
    .initialize()
    .then(()=> {
        console.log(`📚 Data source initialized`)
        app.listen(PORT, ()=> console.log(`🚀server runing on port ${PORT}`));
        })
        .catch(()=>{
            console.error(error);
            process.exit(1);
             
        });

