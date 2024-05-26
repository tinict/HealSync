# Quy trình thực tế người khám bệnh
1. Người bệnh đến khám thì phải đến quầy lễ tân của phòng khám hoặc của bệnh viện làm thủ giấy tờ đăng ký khám
2. Sau khi hoàn thành giấy tờ, thủ tục đăng ký khám người dùng được lễ tân đưa phiếu số đợi
3. Người dùng nhận phiếu rồi đi đến đúng chuyên khoa hoặc phòng được ghi trong phiếu để đợi đến số rồi đi vào khám
4. Sau đó người dùng vào khám sẽ được chỉ định khám lâm sàn (tùy loại bệnh)
5. Tiếp người bệnh sẽ được khám bởi bác sĩ chuyên môn
5. Sau đó người bệnh lại trở lại quầy lễ tân ngồi đợi kêu tên vào nhận hồ sơ chẩn đoản của bác sĩ và đơn thuốc bác sĩ kê
6. Người bệnh tiến hành thanh toán các khoản phí bổ xung (Nếu phát sinh)

# Người dùng (Người bệnh)
# Quy trình được tin học hóa
## Đặt lịch khám
1. Người dùng sẽ truy cập vào bác sĩ trên website
2. Người bệnh có thể tìm kiếm theo dấu hiệu bệnh mình đăng gặp phải
3. Người bệnh có 2 giải pháp đó là tư vấn trực tuyến và khám tợi cơ sở ý tế / phòng khám
4. Người bệnh có thể xem chi tiết thông tin bác sĩ, đánh giá của bác sĩ 
5. Chọn ngày, chọn thời gian (đối với online thời gian nào đã có người đặt hệ thống sẽ làm mờ thời gian đó đi / đối với những khách khám tại phòng khám hệ thống sẽ ghi nhận số lượng khách hàng tối thiểu trên mỗi khung giờ cố định trong ngày), chọn hình thức thực hiện việc đặt lịch sẽ yêu cầu người dùng đăng ký / đăng nhập.
6. Hoàn thành hồ sơ khám điện tử (đối với những người lần thứ 2 trở đi có thể sử dụng bộ hồ sơ đã đăng ký trước đó) và nộp giấy tời khám lâm sàn tối thiểu < 30 ngày
7. Hoàn thành đăng ký đặt lịch
    - Nếu là trực tuyến người dùng phải tiến hành thanh toán online xác nhận hoàn thành giao dịch thành công 
    - Người dùng khám tại cơ sở thì không cần phải thanh toán trước

## Tìm kiếm 
1. Người dùng có thể tìm kiếm theo tên bác sĩ, hoặc 1 mô tả về bắc sĩ đó điều cho ra kết quả
2. Recommend ra những bác sĩ cùng khám bệnh tương tự (feture)

## Quản lý hóa đơn thanh toán
1. Người có thể tra cứu lại lịch sử hóa đơn thanh toán
2. Có thể tải hóa đơn

## Quản lý hồ sơ khám
1. Một bệnh sẽ có khám nhiều lần và mỗi lần khám có thể có nhiều loại giấy tờ khám người bệnh có thể vào đây để xem lại hồ sơ khám

## Quản lý lịch sử đăng ký khám
1. Người dùng đăng ký khám xem lịch sử đăng ký khám và tình trạng lịch đặt khám của mình

## Đánh giá
1. Người dùng có thể đánh giá bác sĩ

## Tìm kiếm lân cận
1. Người dùng có thể tìm kiếm các địa điểm lân cận xung quanh vị trí đang đứng để xác định vị trí các phòng khám xung và cho biết khoảng cách của các phòng so với vị trí đang đứng

## Thread chat
1. Người dùng có thể đặt ra câu hỏi bác sĩ có thể tham gia và trả lời những câu hỏi đúng chuyên môn của mình

## Notifications
- Gửi gmail về gmail của bệnh nhân đăng khám thành công, hoặc nhắc nhở đến khám / đối với những người khám tại chỗ sẽ được cung cấp số thứ tự realtime khi bác sĩ hoàn tất hồ sơ khám hệ thống sẽ ghi nhận và tăng số thứ tự lên. Và đưa nhắc đối với người có số thứ tự lân cận
- Hoặc sử dụng ZNS để nhắc nhở người dùng sử dụng trên ứng dụng zalo về thời gian khám (nhắc nhở)
- Sử noti ngày trên trang web nhắc nhở hoặc 1 số hoặc tin nhắn admin gửi về

# Bác sĩ
## Xác nhận hồ sơ
1. Đối với bác sĩ khi đăng nhập sẽ yêu cầu hoàn các hồ sơ theo chỉ định nếu quá 14 ngày khóa tài khoản
2. Duyệt hồ sơ thành công -> sẽ được thực hiện các quyền thao tác trên hệ thống
3. Hồ sơ được trả lại (chưa đủ điều kiện) => yêu câu trong vòng 14 ngày nộp bổ xung -> sau 14 ngày hủy hồ sơ và khóa tài khoản

## Quản lý form
1. Ngày dùng có thể sủ dụng các mẫu form có sẵn để tạo hồ sơ khám online cho bệnh nhân
2. Người dùng có thể tự động tạo bất kỳ form theo đúng chuẩn tại nơi khám (dynamic form)

## Trả lời các câu hỏi trong cộng động
1. Bác sĩ sẽ được các câu hỏi từ bệnh nhân đặt ra và có nhiệm vụ trả lời (không bắt buộc)

## Đồng bộ calendar
1. Bác sĩ sẽ nhận được lịch khám ngày calendar của điện thoại để nhắc nhở ngay khi đến h khám

## Thống kê số lượt hồ khám và đánh giá review
1. Người dùng có thể đánh giá bác sĩ
2. Thống kê số lượng lượt khám bệnh, thống kê số tiền 

## Bác sĩ quản lý lịch làm việc
1. Bác sĩ có thể quản lý lịch làm việc (thêm xóa sửa)

## Admin
# Thực hiện thống kê 
# Quản lý bác sĩ
- Đánh giá hồ sơ bác sĩ nộp
- Quản lý tài khoản bác sĩ
# Quản lý notification
# Phân quyền tài khoản người dùng
# Quảng tin nhắn cộng đồng

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
serve -s build