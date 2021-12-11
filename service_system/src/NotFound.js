import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function NotFound() {

    const history = useHistory();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => history.goBack()}> Back </Button>}
        />
    )
}