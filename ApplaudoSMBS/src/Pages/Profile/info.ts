/* eslint-disable prettier/prettier */
const Photo = require('./../../assets/img/profile/photo.png');
const Birthday = require('./../../assets/img/profile/birthday.png');
const Pin = require('./../../assets/img/profile/pin.png');
const Phone = require('./../../assets/img/profile/phone.png');
const ReactImage = require('./../../assets/img/profile/react.png');
const NodeJs = require('./../../assets/img/profile/nodejs.png');
const Asp = require('./../../assets/img/profile/asp.png');
const Database = require('./../../assets/img/profile/database.png');
const Css = require('./../../assets/img/profile/css.png');
const Smbs = require('./../../assets/img/profile/smbs.png');
const Developmx = require('./../../assets/img/profile/developmx.png');
const Freelance = require('./../../assets/img/profile/freelance.png');
const Gtec = require('./../../assets/img/profile/gtec.png');

export default {
    photo: Photo,
    name: 'Ing. Edzon Bolivar Santos',
    email: 'edzonbolivar@gmail.com',
    phone: '+528713375315',
    data: [
        {
            id: 'd1',
            title: 'Información personal',
            fields: [
                { id: 'i1', icon: Birthday, value: '07/03/1997' },
                { id: 'i2', icon: Pin, value: 'Torreón, Coahuila, México' },
                { id: 'i3', icon: Phone, value: '+52 871 337 5315' },
            ],
        },
        {
            id: 'd2',
            title: 'Tecnologías',
            fields: [
                { id: 't1', icon: ReactImage, value: 'React.js & React Native' },
                { id: 't2', icon: NodeJs, value: 'Node.js' },
                { id: 't3', icon: Asp, value: 'ASP.NET' },
                { id: 't4', icon: Database, value: 'SQL & MySQL' },
                { id: 't5', icon: Css, value: 'CSS' },
            ],
        },
        {
            id: 'd3',
            title: 'Empresas',
            fields: [
                {
                    id: 'e1',
                    icon: Smbs,
                    value:
                        'Desarrollador Web/ Móvil Full Stack en SMBS Solutions (2019 - Presente)',
                },
                {
                    id: 'e2',
                    icon: Developmx,
                    value: 'Desarrollador Full stack en Develop Mx (2017 - 2019)',
                },
                {
                    id: 'e3',
                    icon: Freelance,
                    value: 'Desarrollador Freelance (2016 - 2019)',
                },
                {
                    id: 'e4',
                    icon: Gtec,
                    value: 'Capacitador G-TEC Computer Education (2016 - 2017)',
                },
            ],
        },
    ],
};
