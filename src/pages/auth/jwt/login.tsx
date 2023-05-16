import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Seo } from 'src/components/seo';
import { GuestGuard } from 'src/guards/guest-guard';
import { IssuerGuard } from 'src/guards/issuer-guard';
import { useMounted } from 'src/hooks/use-mounted';
import { useSearchParams } from 'src/hooks/use-search-params';
import { Layout as AuthLayout } from 'src/layouts/auth/classic-layout';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';
import { Issuer } from 'src/utils/auth';
import { loginReq } from 'src/api/request';
import { useDispatch } from 'src/store';
import { useLoading } from 'src/hooks/use-loading';
import { setAuthData } from 'src/slices/auth';

interface Values {
  user: string;
  password: string;
  submit: null;
}

const initialValues: Values = {
  user: 'kien.ha',
  password: 'naP3@2208',
  submit: null,
};

const validationSchema = Yup.object({
  user: Yup.string().max(255).required('Username is required'),
  password: Yup.string().max(255).required('Password is required'),
});

const Page: PageType = () => {
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const { loading, toggle } = useLoading();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        toggle();
        const data = await loginReq(values);
        dispatch(setAuthData(data));
        toggle();
        if (isMounted()) {
          // returnTo could be an absolute path
          window.location.href = returnTo || paths.index;
        }
      } catch (err) {
        console.error(err);
        toggle();
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={16}>
          <CardHeader
            // subheader={
            //   <Typography
            //     color="text.secondary"
            //     variant="body2"
            //   >
            //     Don&apos;t have an account? &nbsp;
            //     <Link
            //       component={RouterLink}
            //       href={paths.auth.jwt.register}
            //       underline="hover"
            //       variant="subtitle2"
            //     >
            //       Register
            //     </Link>
            //   </Typography>
            // }
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
                  error={!!(formik.touched.user && formik.errors.user)}
                  fullWidth
                  helperText={formik.touched.user && formik.errors.user}
                  label="Username"
                  name="user"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.user}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit as string}
                </FormHelperText>
              )}
              <LoadingButton
                loading={loading}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
              >
                Log In
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
        {/* <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Alert severity="error">
            <div>
              You can use <b>demo@devias.io</b> and password <b>Password123!</b>
            </div>
          </Alert>
          <AuthIssuer issuer={issuer} />
        </Stack> */}
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <IssuerGuard issuer={Issuer.JWT}>
    <GuestGuard>
      <AuthLayout>{page}</AuthLayout>
    </GuestGuard>
  </IssuerGuard>
);

export default Page;
