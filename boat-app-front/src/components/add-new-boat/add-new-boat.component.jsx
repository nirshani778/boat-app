import { useContext, useState } from 'react';
import { addBoat } from '../../utils/boat-app-back/boat-app-back';
import { AddNewBoatViewContext } from '../../contexts/add-new-boat-view.contexts';
import Button from '../button/button.component';
import './add-new-boat.styles.scss';

const boat = {
  name: '',
  description: '',
  imageUrl: '',
};

const AddNewBoat = () => {
  const [fromFields, setFromFields] = useState(boat);
  const { name, description, imageUrl } = fromFields;
  const { newBoatView, setNewBoatView } = useContext(AddNewBoatViewContext);
  const [msg, setMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFromFields({ ...fromFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await addBoat(name, description, imageUrl);
      console.log(result);
      if (result.success === true) {
        setNewBoatView(!newBoatView);
      } else {
        setMsg(result.message);
      }
    } catch (error) {
      console.log('On add boat encountered an error', error);
    }
  };

  return (
    <div className="add-boat-container">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="add-boat-card-container">
            <div className="add-boat-card">
              <div className="boat-data-img">
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
              <hr className="add-boat-splitter" />
              <div className="boat-data-container">
                <div className="boat-data-unit">
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
                <div className="boat-data-unit">
                  <h4>Description</h4>
                  <textarea
                    label="description"
                    rows="3"
                    placeholder="Enter your message"
                    type="text"
                    required
                    onChange={handleChange}
                    name="description"
                    value={description}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <Button type="submit" name="Save" />
            </div>
            <span>{msg}</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewBoat;
