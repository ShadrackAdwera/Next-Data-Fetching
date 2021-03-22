import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

const ItemDetails = props => {
    const { item } = props;

    if(!item) {
        return <p className='centered'>Loading...</p>
    }
    
    return <div className='centered'>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <Link href='/'>Go Bacc</Link>
    </div>

}

//runs before the component runs.
export async function getStaticProps(context) {
    const { params } = context;
    const iId = params.itemId;
    const filePath = path.join(process.cwd(), 'data','dummy-data.json');
    const stringifiedData = await fs.readFile(filePath);
    const data = JSON.parse(stringifiedData);

    const foundItem = data.items.find(item=>item.id===iId);

    if(!foundItem) {
        return { notFound: true }
    }

    return {
        props: { item: foundItem }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { itemId: 'itemId1' } }
        ],
        fallback: true
    }
}

export default ItemDetails;