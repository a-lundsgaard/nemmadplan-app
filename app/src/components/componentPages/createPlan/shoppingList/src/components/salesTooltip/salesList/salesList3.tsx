
import SalesItem from './salesItem2'

export default function SalesList3({ sales, id }) {

    //const classes = useStyles();
    const hej = 1;
    return (
      <section style={{ overflow: 'scroll', maxHeight: 500, zIndex: '2' }}>
        {
          sales.map((item, index) => (
            <span key={index} >
            {index ? <hr/> : null}
            <SalesItem key={index} item={item} id={id} />
            </span>
          ))
        }
      </section>
    )
  } 
