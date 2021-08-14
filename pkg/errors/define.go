package errors

const defaultErrorMessage = "エラーが発生しました"

var (
	// SystemPanic is panic error
	SystemPanic = newInternalServerError("system_panic", defaultErrorMessage)
	// StstemDefault is default error
	SystemDefault = newInternalServerError("system_default", defaultErrorMessage)
	// StstemUnknown is unknown error
	SystemUnknown = newInternalServerError("system_unknown", defaultErrorMessage)
	// InvalidParameter is invalid parameter error
	InvalidParameter = newBadRequest("invalid_parameter", defaultErrorMessage)
	// NotFound is not found error
	NotFound = newNotFound("not_found", "ページが見つかりませんでした")
)
