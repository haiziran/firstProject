function HashMap() {

    var size = 0;
    var entry = new Object();

    this.add = function (key , value)
    {
        if(!this.containsKey(key))
        {
            size++ ;
        }
        entry[key] = value;
    }

    this.getValue = function (key)
    {
        return this.containsKey(key) ? entry[key] : null;
    }

    this.setValue = function (key, value)
    {
        if( this.containsKey(key) )
        {
            entry[key] = value;
        }
    }

    this.remove = function ( key )
    {
        if( this.containsKey(key) && ( delete entry[key] ) )
        {
            size--;
        }
    }

    this.containsKey = function ( key )
    {
        return (key in entry);
    }

    this.containsValue = function ( value )
    {
        for(var prop in entry)
        {
            if(entry[prop] == value)
            {
                return true;
            }
        }
        return false;
    }

    this.getValues = function ()
    {
        var values = new Array();
        for(var prop in entry)
        {
            values.push(entry[prop]);
        }
        return values;
    }

    this.getKeys = function ()
    {
        var keys = new Array();
        for(var prop in entry)
        {
            keys.push(prop);
        }
        return keys;
    }

    this.getKeysByValue = function ( value ) //值相同
    {
        var values = new Array();
        for(var prop in entry)
        {
            if(entry[prop] == value)
            {
                values.push(prop);
            }
        }
        return values;
    }

    this.getObjects = function()
    {
        return entry;
    }

    this.getSize = function ()
    {
        return size;
    }

    this.clear = function ()
    {
        size = 0;
        entry = new Object();
    }

    this.get = function(key)
    {
        return this.getValue(key);
    }

    this.has = function(key)
    {
        return this.containsKey(key);
    }

    this.forEach = function(fn, that){
        that = that || window;
        for(var prop in entry)
        {
            fn.call(that, entry[prop], prop, entry);
        }
    }
}