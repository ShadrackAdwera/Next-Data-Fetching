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

const fetchData = async() => {
    const filePath = path.join(process.cwd(), 'data' , 'dummy-data.json');
    const stringifiedData = await fs.readFile(filePath);
    return JSON.parse(stringifiedData);
}

//runs before the component runs.
export async function getStaticProps(context) {
    const { params } = context;
    const iId = params.itemId;
    const data = await fetchData();

    const foundItem = data.items.find(item=>item.id===iId);

    if(!foundItem) {
        return { notFound: true }
    }

    return {
        props: { item: foundItem }
    }
}

export async function getStaticPaths() {
    const data = await fetchData();
    const ids = [];
    for(const item of data.items) {
        ids.push({params: { itemId: item.id }});
    }
    return {
        paths: ids,
        fallback: 'blocking'
    }
}

export default ItemDetails;