export class Field {
    constructor(value) {
        this.value = value;
    }

    static {
        this.allFieldClasses = new Map();
        this.allFieldClasses.set('field', this);
    }
}

class URLField extends Field {
    _linkStart;

    get fullLink() {
        return this._linkStart + this.value;
    }

    hasLink = true;
}

class Address extends Field {
    static {
        super.allFieldClasses.set('address', this);
    }
}

class Phone extends Field {
    static {
        super.allFieldClasses.set('phone', this);
    }
}

class Email extends Field {
    static {
        super.allFieldClasses.set('email', this);
    }
}

class Telegram extends URLField {
    static {
        super.allFieldClasses.set('telegram', this);
    }

    _linkStart = 'https://t.me/';
}

class VK extends URLField {
    static {
        super.allFieldClasses.set('vk', this);
    }

    _linkStart = 'https://vk.com/';
}