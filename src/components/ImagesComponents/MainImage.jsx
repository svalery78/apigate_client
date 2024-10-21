import image from '../../assets/mainImage.svg'
import s from '../Content/Content.module.css'

const MainImage = () => { 
        return ( <div className={s.gridImage}>
            <div className={s.image}>
                <img src={image} alt={"mainImage"}/> 
            </div>
            <div className={s.image}>
                
            </div>
            </div>
        )  
}
export default MainImage;