import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, CardContent, CardHeader, FormHelperText, TextField } from '@mui/material';
import { Seo } from 'src/components/seo';
import type { AuthContextType } from 'src/contexts/auth/amplify-context';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useRouter } from 'src/hooks/use-router';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import { Issuer } from 'src/utils/auth';

interface Values {
  email: string;
  submit: null;
}

const initialValues: Values = {
  email: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required')
});

const Page: PageType = () => {
  const isMounted = useMounted();
  const router = useRouter();
  const { forgotPassword } = useAuth<AuthContextType>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await forgotPassword(values.email);

        if (isMounted()) {
          const searchParams = new URLSearchParams({ username: values.email }).toString();
          const href = paths.auth.amplify.resetPassword + `?${searchParams}`;
          router.push(href);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  usePageView();

  return (
    <>
      <Seo title="Forgot Password" />
      <div>
        <Card elevation={16}>
          <CardHeader
            sx={{ pb: 0 }}
            title="Forgot password"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                autoFocus
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Send reset link
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.Amplify}>
    <GuestGuard>
      <AuthLayout>
        {page}
      </AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
