const UserInfo = props => {
    const { userDetails } = props;
    return <div className='centered'>
        <h1>{userDetails.userName}</h1>
        <h3>{userDetails.department}</h3>
        <h5>{userDetails.designation}</h5>
    </div>
}

//similar to getStaticProps but revalidate key cannot be set here
export async function getServerSideProps(context) {
    const userDetails = {
        userName: 'Deez Nuts',
        department: 'ICT Department',
        designation: 'Next.js Developer'
    }
    return { props: { userDetails: userDetails } }
}

export default UserInfo;

