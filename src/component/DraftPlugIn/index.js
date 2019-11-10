const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
        case 'text-left-draft':
            return 'text-left-draft';
            break;
        case 'text-right-draft':
            return 'text-right-draft';
            break;
        case 'text-center-draft':
            return 'text-center-draft';
            break;
        case 'text-justify-draft':
            return 'text-justify-draft';
            break;
        
    }
    
}

// const myCustomStyleFn = (style,contentBlock)=>{
//     const type = contentBlock.getType();
//     console.log(contentBlock.getType());
//     console.log(style);
//     switch(type){
//         case 'text-white-color-draft':
//             return 'text-white-color-draft';
//             break;
//         case 'text-red-color-draft':
//             return 'text-red-color-draft';
//             break;
//         case 'text-orange-color-draft':
//             return 'text-orange-color-draft';
//             break;
//         case 'text-yellow-color-draft':
//             return 'text-yellow-color-draft';
//             break;
//         case 'text-green-color-draft':
//             return 'text-green-color-draft';
//             break;
//         case 'text-blue-color-draft':
//             return 'text-blue-color-draft';
//             break;
//         case 'text-darkblue-color-draft':
//             return 'text-darkblue-color-draft';
//             break;
//         case 'text-violet-color-draft':
//             return 'text-violet-color-draft';
//             break;
//         case 'text-darkgray-color-draft':
//             return 'text-darkgray-color-draft';
//             break;
//         case 'text-black-color-draft':
//             return 'text-black-color-draft';
//             break;
//     }
//   };
export {
    myBlockStyleFn,
    // myCustomStyleFn
};