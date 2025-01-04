import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import BackgroundRemove from '@/form-handling/BackgroundRemove';
// import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import RestoreImageActions from '@/form-handling/RestoreImageActions';
import ImageGeneration from '@/generative-fill/ImageGeneration';
import ImageSearchApp from '@/generative-fill/ImageGallery';
// import ImageCompression from '@/form-handling/ImageCompression';
// import ImageConversion from '@/form-handling/ImageConversion';
// import TextImageGenerator from '@/components/TextImageGenerator';
import TextToImageGenerator from '@/image-generation/TextToImageGenerator';
import ImageEditor from '@/generative-fill/ImageCaption';
const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  // const user = await getUserById(userId);

  const renderTransformationForm = () => {
    switch (transformation.title) {
      case 'Generative Fill':
        return <ImageGeneration />;
      case 'Restore Image':
        return <RestoreImageActions />;
      case 'Image Edit':
        return <ImageEditor />;
      case 'Image Gallery':
        return <ImageSearchApp />;
      case 'Background Remove':
        return <BackgroundRemove/>
      default:
        return <p>Please select a valid transformation type.</p>;
    }
  };
  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        {/* <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        /> */}
         {renderTransformationForm()}
      </section>
    </>
  )
}

export default AddTransformationTypePage