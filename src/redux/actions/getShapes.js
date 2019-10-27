export const type = 'getShape';

const getShape = id =>{
    return {
        type:type,
        payload: id

    };
}

export default getShape;