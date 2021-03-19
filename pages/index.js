import path from 'path';
import fs from 'fs/promises';

const HomePage = props => {
    const { items } = props;
    return <ul>
        {items.map(item=><li key={item.id}>{item.title}</li>)}
    </ul>;
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(),'data','dummy-data.json');
    const stringifiedData = await fs.readFile(filePath);
    const data = JSON.parse(stringifiedData);
    return {props: {
        items: data.items
    }};
}

export default HomePage;