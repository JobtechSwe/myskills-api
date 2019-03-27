export default (error: Error) => {
  console.log('errorz', error)
  // const { constructor } = error.originalError;

  // let code;

  // switch (constructor) {
  //     case AuthorizationError:
  //         code = 'authorization_error';
  //     case ResourceNotFound:
  //         code = 'resource_not_found';
  //     default:
  //         code = 'server_error';
  // }

  return {
    extensions: {
      code: 'hej',
    },
    ...error,
  }
}
