import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import BackgroundRemove from '@/form-handling/BackgroundRemove';
// import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  // const user = await getUserById(userId);

  const renderTransformationForm = () => {
    switch (transformation.title) {
      // case 'Generative Fill':
      //   return <GenerativeFill />;
      // case 'Restore Image':
      //   return <Restore />;
      // case 'Object Remove':
      //   return <BackgroundRemovalComponent />;
      // case 'Object Recolor':
      //   return <ObjectRecolor />;
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