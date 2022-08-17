import { useParams } from "react-router-dom";
import Layout from "../app/layout";
import Form from "../app/submit/Form";

function Submit() {
    const { cid } = useParams();
    
    return (
        <Layout>
            <div className="flex-grow lg:w-5/6 mx-auto">
                <div className="px-5 lg:px-0 my-5">
                    <h3 className="font-medium text-lg">Submit Content</h3>
                    <small className="text-gray-400">Fill this to submit an article</small>
                </div>
                <Form />
            </div>
        </Layout>
    )
}

export default Submit;