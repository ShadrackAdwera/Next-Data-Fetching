import path from 'path';
import fs from 'fs/promises';

const ItemDetails = props => {
    const { item } = props;
    
    return <div className='centered'>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
    </div>

}

//runs before the component runs.
export async function getStaticProps(context) {
    const { params } = context;
    const iId = params.ItemId;
    const filePath = path.join(process.cwd(), 'data','dummy-data.json');
    const stringifiedData = fs.readFile(filePath);
    const data = JSON.parse(stringifiedData);

    const foundItem = data.items.find(item=>item.id===iId);

    if(!foundItem) {
        return { notFound: true }
    }

    return {
        props: { item: foundItem },
        revalidate: 10
    }
}

export default ItemDetails;