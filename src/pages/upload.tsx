import { NextPage } from "next"
const upload: NextPage = () => {
  return (<form action="/uploadOne" method="post" encType="multipart/form-data">
  <label htmlFor="label">recipe label:</label><br />
  <input type="text" id="label" name="label" /><br />
  <label htmlFor="photo">recipe photo:</label><br />
  <input type="file" name="photo" />
  <input type="submit" value="Submit" />
</form>)
}

export default upload
