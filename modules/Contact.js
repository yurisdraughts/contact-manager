import { Field } from './Fields.js'

export class Contact {
    constructor(name) {
        this.name = name;
        this.fields = {};
        this.created = Date.now();
    }

    addField(value, fieldClassName = Field.className) {
        const FieldClass = Field.allFieldClasses.get(fieldClassName);
        this.fields[FieldClass.name] = new FieldClass(value);
    }

    deleteField(value) {
        for(let key of Object.keys(this.fields)) {
            if (this.fields[key].value === value) {
                delete this.fields[key];
                return;
            }
        }
    }
}