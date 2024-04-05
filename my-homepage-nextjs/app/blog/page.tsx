import { client, getList, getTagList} from "../../libs/microcms";

import styles from "../_common-components/Article.module.css";
import Bloglist from "./bloglist";




export default async function StaticPage() {
 const { contents } = await getList();
 const tags = await getTagList();

 if (!contents || contents.length === 0) {
  return <h1>No contents</h1>;
 }

 return (
    <div className={styles.article}>
        <div className={styles.universal_layout}>
            <h1>Blog</h1>
            <div>
                <Bloglist contents={contents} tags={tags}></Bloglist>
                
            </div>
        </div>
    </div>
 );
}
