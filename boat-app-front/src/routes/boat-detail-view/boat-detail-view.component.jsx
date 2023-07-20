import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { saveBoat, deleteBoat } from '../../utils/boat-app-back/boat-app-back';
import Button from '../../components/button/button.component';
import './boat-detail-view.styles.scss';

const BoatDetailView = () => {
  const [msg, setMsg] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const { from } = location.state;
  const { id } = from;
  const [fromFields, setFromFields] = useState(from);
  const { name, description, imageUrl } = fromFields;
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate('/authentication');
    }
  }, [currentUser, navigate]);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const data = await deleteBoat(id);
      if (data.success === true) {
        navigate('/');
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      console.log('On Delete encountered an error', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const data = await saveBoat(id, name, description, imageUrl);
      if (data.success === true) {
        setUpdate();
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      console.log('On Save encountered an error', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({ ...fromFields, [name]: value });
  };

  const setUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return (
    <div className="boat-view-container">
      <div className="boat-card-img">
        <img alt={`boat ${name}`} src={imageUrl} />
      </div>
      <hr className="splitter" />
      <div className="boat-card-content">
        {isUpdate ? (
          <div>
            <div>
              <h4>Name</h4>
              <input
                label="name"
                placeholder="Enter a name"
                type="text"
                required
                onChange={handleChange}
                name="name"
                value={name}
              />
            </div>
            <div>
              <h4>Description</h4>
              <textarea
                label="description"
                rows="5"
                placeholder="Enter your message"
                type="text"
                required
                onChange={handleChange}
                name="description"
                value={description}
              ></textarea>
            </div>
            <div>
              <h4>Image Url</h4>
              <input
                label="imageUrl"
                placeholder="Enter Image Url"
                type="text"
                required
                onChange={handleChange}
                name="imageUrl"
                value={imageUrl}
              />
            </div>
          </div>
        ) : (
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        )}
      </div>
      <div className="btn-container">
        {isUpdate ? (
          <Button onClick={handleSave} name="SAVE" />
        ) : (
          <Button onClick={setUpdate} name="Update" />
        )}
        {isUpdate ? <div /> : <Button onClick={handleDelete} name="Delete" />}
      </div>
      <h5>{msg}</h5>
    </div>
  );
};
export default BoatDetailView;
