import shoppingListIconSelfMade from './shopping-list-icon.png';

export default function styles(sales, open) {

    return {
        icon: {
          height: 50,
          width: 50,
          // fontSize: 90,
          cursor: 'pointer',
          //transition: '0.5s',
          //transform: open && "rotate(180deg)",
          background: `url(${shoppingListIconSelfMade})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          margin: '10px 0 0 28px',
          //backgroundColor: 'red'
          //borderBottom: '1px solid #ccc'
          //paddingRight: '20px'
        },
    
        counter: {
          marginLeft: 25,
          padding: sales.length < 10 ? '7px 10px 7px 10px' : '7px 7px 7px 7px',
          background: '#3f51bf',
          color: 'white',
          borderRadius: '50%'
        },
    
        infoText: {
          margin: '5px 0 0px 10px',
          fontSize: 14,
          //opacity: 0.8,                                        
          opacity: open ? 0 : 0.8,
          transition: "opacity 0.8s ease-in-out",
          /* borderBottom: '1px solid',
          width: '100%' */
        }
    
      }


}