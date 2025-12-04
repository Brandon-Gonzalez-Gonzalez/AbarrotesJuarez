//Metodo de rutas de los componentes 
export var Url = {
    api: '/api/',
    
    load: {
        components: [
            {parent: 'sidemenu',
                url: 'Components/sidemenu'
            },
            {parent: 'header',
                url: 'Components/header'
            },
            {parent: 'ventas',
                url: 'Components/ventas'
            },
            {parent: 'ganancias',
                url: 'Components/ganancias'
            },
            {parent: 'facturas',
                url: 'Components/facturas'
            },
            {parent: 'inventario',
                url: 'Components/inventario'
            },
        ]
    }
};

