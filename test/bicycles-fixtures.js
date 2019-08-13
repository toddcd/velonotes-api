function makeBicycles() {
    return [
        {
            user_id: 1,
            mfr_bike_id: 1,
            geo_id: 1,
            nick_name: 'SpecializedBike',
        },
        {
            user_id: 1,
            mfr_bike_id: 2,
            geo_id: 2,
            nick_name: 'GiantBike',
        },
    ]
}

function makePositions() {
    return [
        {
            user_bike_id: 1,
            name: 'initial set of new position',
            description: 'fitting done at the shop',
            active: false,
            stem: 120,
            stem_angle: 6,
            handlebar: 42,
            handlebar_bend: 'shallow',
            crank: 175,
            crank_q: '',
            seat: 143,
            seat_height: 805,
            handlebar_reach: 610,
            handlebar_drop: 110,
            setback: 110
        }
    ]
}

function makeNote() {
    return [
        {
            user_bike_id: 1,
            note_type: 'setup',
            note: 'new bike setup at the shop'
        },
    ]
}

function mfrBikes() {
    return [
        {
            make: 'Specialized',
            model: 'Crux',
            year: '2019'
        },
        {
            make: 'Giant',
            model: 'TCX Advanced',
            year: '2020'

        }
    ]
}

function mfrBikeGeometry() {
   return [
        {
            mfr_bike_id: 1,
            size: '58',
            reach: 395,
            top_tube_length: 578,
            stack: 597,
            wheelbase: 1034,
            chainstay: 425,
            front_center: 618,
            bb_drop: 67,
            bb_height: 285.5,
            seat_tube_angle: 73,
            head_tube_angle: 72.5,
            seat_tube_length: 570,
            head_tube_length: 170,
            standover: 840.5,
            rake: 50,
        },
       {
           mfr_bike_id:2,
           size:'large' ,
           seat_tube_length:555,
           seat_tube_angle:73,
           top_tube_length:575,
           head_tube_length:175,
           head_tube_angle:72.5,
           rake:50,
           trail:59,
           wheelbase:1040,
           chainstay:430,
           bb_drop:60,
           stack:589,
           reach:395,
           standover:832,
       }
    ]


}

module.exports = {
    makeBicycles,
    mfrBikes,
    mfrBikeGeometry,
}