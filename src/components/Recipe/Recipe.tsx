import { useEffect, useState } from "react";
import { useQuery } from "../../utils/hooks/useQuery";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { Image, Space, Typography } from "antd";

import testImage from "../../assets/testChicken.jpg";

import "./Recipe.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface QueryParams {
  id: string;
}

const Recipe = () => {
  const queryParams = useQuery<QueryParams>();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!queryParams.id) {
      navigate("/");
    }
  }, [queryParams]);
  return (
    <Content className="recipe-page">
      <div className="recipe-page-main-content">
        <Image src={testImage} width={440} rootClassName="recipe-page-image" />
        <Typography>
          <div className="recipe-page-main-content-title">
            <Title>Наггетсы</Title>
            <div className="recipe-page-like" onClick={() => setIsLiked(!isLiked)}>
              {!isLiked && <HeartOutlined />}
              {isLiked && <HeartFilled className="liked" />}
            </div>
          </div>
          <Title level={4}>Описание</Title>
          <Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita odio eum nobis non
            cupiditate blanditiis corporis ullam, pariatur id, beatae dolorum fugit tempore quidem
            sequi facere necessitatibus commodi fugiat quia excepturi, error a perspiciatis harum.
            Magni ipsum soluta tenetur. Corrupti!
          </Paragraph>
          <Title level={4}>Ингредиенты</Title>
          <Space></Space>
        </Typography>
      </div>
    </Content>
  );
};

export default Recipe;
