**Project Build Website HealthHub**

**[Document 052524 – Version 1.0.0]**

**HealthHub – v1.0.0** 

**[Auth: Nguyen Van Tin]**
# **Workflow v1.0.0** 
## **Vai trò tham gia hệ thống**
- Bác sĩ (doctor)
- Khách hàng (bệnh nhân)
- Quản trị viên (admin)
## **Chức năng v1.0.0**
### **Chức năng với vai trò bác sĩ (doctor)**
- Quản lý lịch khám
  - Dữ liệu đầu vào (input): 
    - Số lượng bệnh
    - Gía khám
    - Vị trí khám
    - Hình thức khám
    - Khoảng thời gian
    - Ngày tạo
  - Thông tin đầu ra (output)
    - Lịch khám chứa thông tin trên
  - Mô tả ngắn gọn: Mỗi một bác sĩ được cấp một tài khoản duy nhất và mỗi bác sĩ có thể tạo được nhiều lịch khám tương ứng (ngày khám), nó có nhiệm vụ phân biệt các khoảng thời gian khám những các ngày nên chọn lịch khám để quản lý các khoảng thời gian khám trong ngày. Một bác sĩ có 1 hoặc nhiều lịch khám. Mỗi lịch khám có 1 hoặc nhiều khoảng thời gian khám (ca khám).
  - Tạo lịch khám
    - Nhập đẩy đủ dữ liệu đầu vào bấm tạo lịch khám. Nếu thành công hệ thống sẽ thông báo thành công (done)
  - Chỉnh sửa lịch khám
    - Bác sĩ có thể chỉnh sửa thông tin lịch khám (done)
    - Hệ thống sẽ thông báo đã có người đăng ký khám vào lịch khám hiển thị “Thông tin chỉnh sửa thông tin sẽ bị hạn chế” (done)
  - Xóa lịch khám
    - Bác sĩ có thể xóa lịch khám thành công khi không có khách hàng (bệnh nhân) đăng ký khám (done)
    - Bác sĩ sẽ không thể xóa lịch khám vì đã có khách hàng (bệnh nhân) đặt lịch khám (done)
    - Nếu hủy lịch khách hàng (bệnh nhân) sẽ nhận được thông báo qua email (pendding)
      - Hệ thống tuần tự thực hiện modal bác sĩ nhập nội dung gửi về cho khách hàng (bệnh nhân), sau đó tiến hành cập nhật trạng thái (lock) khóa lịch.
        - Gửi mail về người dùng đã xóa email (list email khách hàng đã đặt lịch khám)
        - Yêu cầu người dùng đổi lịch 
        - Cập nhật lại trạng thái lịch là lock (typeSchedule)
  - Ngoại lệ của quản lý lịch khám như sau:
    - Yêu cầu các khoảng thời gian trong 1 lịch được tạo (theo ngày) cùng loại không được trùng chéo lên nhau (done)
    - Yêu cầu các khoảng thời gian thuộc vào lịch có hình thức khám (tư vấn trực tuyến và khám tại đơn vị) không được chồng chéo với nhau. (done)
      - Ví dụ: Đã đặt lịch khám cho hình thức đơn vị, thì khoảng thời gian đó không được tạo cho hình thức khám tư vấn trực tuyến được.
- Quản lý hồ sơ mẫu
  - Bác sĩ có thể tiến hành kéo thả tạo hồ sơ mẫu (dynamic form)
  - Bác sĩ có thể xóa hồ sơ mẫu
  - Tạo bệnh án cho bệnh nhân
    - Bác sĩ có thể xem được toàn bộ lịch sử khám của tài khoản đó. Vì 1 tài khoản có nhiều bộ hồ sơ khám. Thuận tiện việc tra cứu hồ sơ khám điện tử trên hệ thống. Biết được lịch sử khám.
    - Chọn mẫu hồ sơ khám bất kỳ đã tạo ở trên, bấm sử dụng tiến hành sử dụng mẫu khám.
      - Bác sĩ có thể tái xuống
      - Có thể lưu lại hồ sơ
- Quản lý bệnh nhân
  - Quản lý lịch sử bệnh nhân đã đặt lịch khám
  - Quản lý hồ sơ bệnh án điện tử của bệnh nhân đã từng đặt lịch khám
- Quản lý thông tin cá nhân
  - Bác sĩ có thể cập nhật thông tin
    - Cá nhân
    - Nghiệp vụ
- Threads chat
  - Tạo nội dung chính cần trò chuyện
  - Sau đó các khách hàng khác và bác sĩ cùng tham gia vào cùng nhau thảo luận vấn đề đã tạo.
- Thống kê
  - Thống kê số tiền, số lượng khách hàng (bệnh nhân) đặt lịch khám theo các khoảng thời gian trong ngày. Tháng
- Quản lý lịch tái khám
  - Bác sĩ có thể theo dõi được bệnh nhân đặt lịch khám
  - Bệnh nhân đặt lịch tái khám thì phía bác sĩ sẽ xuất hiện lịch
  - Bác sĩ có thể yêu cầu đổi lịch khám, trong phạm vi lịch được phép đổi, thuộc phạm vi giới hạn được phép cho đổi.
### **Chức năng với vai trò bệnh nhân**
- Quản lý lịch khám
  - Đặt lịch khám
    - Người dùng có thể đặt lịch khám khi đã đăng nhập
    - Người dùng phải tiến hành đặt lịch khám khi trước một ngày khám (hệ thống lock lại)
    - Người dùng sẽ không đặt được lịch nếu hệ thống đã đủ số lượng bệnh nhân khám trong 1 ca khám.
  - Hủy lịch khám
    - Hủy lịch khám hệ thống sẽ cập nhật lại trạng thái cho bệnh nhân “Hủy khám”
- Thanh toán
  - Bệnh nhân sẽ tiến hành thanh toán qua cổng VNPay
  - Bệnh nhân có thể truy vấn xem được lịch sử hóa đơn khách hàng đã thanh toán tiền đặt lịch khám.
- Hoàn tiền
  - Khi khách hàng (bệnh nhân) hủy lịch, hệ thống ghi nhận và tiến hành đưa ra yêu cầu chờ hoàn tiền đến phía quản trị viên
- Theo dõi số thứ tự khám theo thời gian thực
  - Người dung chỉ cần thực hiện việc nhập mã đặt lịch khám hệ thống sẽ tiến hành kiểm tra
    - Đã đến lịch khám hay chưa
    - Đã khám đến ca khám (khoảng thời gian khách hang đã đặt lịch khám hay chưa) ca khám này phải thực lịch khám (lịch khám thuộc ngày đó).
- Hồ sơ khám điện từ
  - Hiển thị những bộ sơ điện tử khám của tài khoản đang đăng nhập đã thực hiện việc đặt lịch khám.
- Quản lý lịch tái khám
  - Đặt lịch tái khám
    - Người dùng tiến hành đặt lịch tái khám
    - Ngoại lệ: Khi đã vượt qua ngày khám bác sĩ hẹn hệ thống sẽ tự ẩn việc đặt lịch khám của bệnh nhân lại.
  - Đổi lịch tái khám
    - Bệnh nhân có thể có quyền thực hiện thao tác đổi lịch khám khi có việc đột xuất, có thể đổi lịch khám sang một ngày khác.
- Hỏi đáp bác sĩ
  - Tạo nội dung chính cần trò chuyện
  - Sau đó các khách hang khác và bác sĩ cùng tham gia vào cùng nhau thảo luận vấn đề đã tạo.
- Đánh giá bác sĩ
  - Người dùng có thể đánh giá được bác sĩ với yêu cầu sau
    - Đã đăng nhập
    - Đã đặt lịch khám bác sĩ này
- Quản lý thông tin cá nhân
  - Bênh nhân có thể chỉnh sửa thông tin cá nhân
- Đăng nhập
  - Sử dịch vụ xác thực của Google để, ủy quyền đăng nhập vào hệ thống.
- Tư vấn trực tuyến
  - Bệnh nhân sẽ được tư vấn trực tuyến thông qua Google Meet
  - Lịch bệnh nhân sẽ có đồng bộ với Google Calendar sẽ để phục vụ việc nhắc nhở khám đúng thời gian đặt lịch khám.
- Chat bot
  - Hệ thống tích hợp bằng cách nhúng Dialogflow. Bot được trên ở nền Google Flatform
