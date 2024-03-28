import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SideNav from './_account/SideNav';

const sideNavValue = ['General', 'Password and logins'];
const Account: React.FC = () => {
  return (
    <main className='bg-background w-full px-12 mt-24 '>
      <div className='flex'>
        <SideNav />
        <div className='w-full flex flex-col items-center px-4'>
          <div className='w-full max-w-[829px] min-w-[410px] bg-gray-200'>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
