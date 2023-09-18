import { useEffect, useState } from "react";
import { useQuery } from "../../utils/hooks/useQuery";
import { useNavigate } from "react-router";
import { Content } from "antd/es/layout/layout";
import { Image, Popover, Rate, Tag, Typography } from "antd";
import {
  FireFilled,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import testImage from "../../assets/testChicken.jpg";

import "./Recipe.scss";
import "react-quill/dist/quill.snow.css";
import AuthUserHeart from "./AuthUserHeart";
import NotAuthUserHeart from "./NotAuthUserHeart";

const { Title, Paragraph, Text } = Typography;

interface QueryParams {
  id: string;
}

const Recipe = () => {
  const queryParams = useQuery<QueryParams>();
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState(true);

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
            {isAuthorized && <AuthUserHeart />}
            {!isAuthorized && <NotAuthUserHeart />}
          </div>

          <Rate
            disabled
            value={3}
            character={<FireFilled />}
            className="recipe-page-rate"
          />
          <Title level={4}>Описание</Title>
          <Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
            odio eum nobis non cupiditate blanditiis corporis ullam, pariatur
            id, beatae dolorum fugit tempore quidem sequi facere necessitatibus
            commodi fugiat quia excepturi, error a perspiciatis harum. Magni
            ipsum soluta tenetur. Corrupti!
          </Paragraph>
          <Title level={4}>Ингредиенты</Title>
          <div>
            {new Array(20).fill(null).map((_, idx) => (
              <Popover
                key={idx}
                content={
                  <Paragraph style={{ maxHeight: 150, overflow: "auto" }}>
                    <ul>
                      <li>Тросниковый сахар</li>
                      <li>молоко</li>
                      <li>Черешня</li>
                    </ul>
                  </Paragraph>
                }
                title="Или же..."
              >
                <Tag
                  style={{ margin: 3, cursor: "default" }}
                  icon={<MoreOutlined />}
                >
                  Сахар{idx}
                </Tag>
              </Popover>
            ))}
          </div>
        </Typography>
      </div>
      <div style={{ marginTop: 30 }}>
        <Title level={2}>Этапы приготовления</Title>
        <Paragraph>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            qui numquam quisquam, expedita nesciunt mollitia at maxime
            consequuntur, earum cum, officia accusamus velit? Ex hic sequi
            sapiente qui illum ut. Quaerat atque harum earum asperiores nulla
            rem fugit. Magnam cum beatae in illum repellat vitae, repudiandae
            obcaecati alias incidunt amet. Ullam vel autem, eaque, repellat
            minima expedita quis consectetur tempora tempore vero dicta facilis?
            Reprehenderit, molestiae repellendus porro voluptatibus quibusdam
            minus hic dolorum consequuntur temporibus inventore assumenda
            explicabo blanditiis neque velit distinctio iusto ab repudiandae
            sunt natus nam veritatis sequi! Similique voluptatum illum deserunt.
            Corrupti optio delectus reiciendis deserunt ullam, neque ut soluta
            blanditiis consequuntur placeat quaerat mollitia minus praesentium
            asperiores. Enim corporis quia quo, sunt facere modi unde eligendi
            consectetur sit. Blanditiis iure possimus, reprehenderit temporibus
            ea adipisci suscipit consectetur alias nisi quos voluptatem
            voluptates maxime soluta facilis, est illo id? Inventore, magnam
            expedita optio quo fugiat tempore illo ad! Qui, veniam. Cupiditate
            repellendus nam quo exercitationem necessitatibus? Ipsam dolor vero,
            aliquid ratione, tenetur perspiciatis voluptas, et magnam modi
            numquam nulla voluptatibus cum doloremque labore repellendus
            possimus optio aut quam expedita rem laborum! Magnam eaque, ducimus
            dolorum nobis illo consectetur ratione. Corporis nulla voluptatibus
            quod at veniam dolore recusandae?
          </Text>
        </Paragraph>
      </div>
    </Content>
  );
};

export default Recipe;
