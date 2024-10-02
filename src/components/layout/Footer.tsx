import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-container text-white border-t border-gray-700'>
      <div className='container mx-auto p-5 py-8'>
        <div className='flex flex-col md:flex-row justify-evenly gap-8'>
          {/* Logo and Description */}
          <div className='flex-[2] w-[10px]'>
            <img src='/netflix-logo.png' alt='Mephim Logo' className='w-24 h-24 aspect-square' />
            <p className='text-sm text-gray-300 leading-relaxed'>
              Mephim - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện trực quan, tốc độ tải trang
              nhanh, cùng kho phim với hơn 10.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút
              giây thư giãn cho bạn.
            </p>
          </div>

          {/* Danh mục */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-blue-400'>Danh mục</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/phim-moi' className='hover:text-blue-400 transition-colors duration-300'>
                  Phim mới
                </a>
              </li>
              <li>
                <a href='/phim-le' className='hover:text-blue-400 transition-colors duration-300'>
                  Phim lẻ
                </a>
              </li>
              <li>
                <a href='/phim-bo' className='hover:text-blue-400 transition-colors duration-300'>
                  Phim bộ
                </a>
              </li>
              <li>
                <a href='/phim-chieu-rap' className='hover:text-blue-400 transition-colors duration-300'>
                  Phim chiếu rạp
                </a>
              </li>
            </ul>
          </div>

          {/* Thể loại */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-blue-400'>Thể loại</h3>
            <ul className='space-y-2'>
              <li>
                <a href='/the-loai/hanh-dong' className='hover:text-blue-400 transition-colors duration-300'>
                  Hành động
                </a>
              </li>
              <li>
                <a href='/the-loai/tinh-cam' className='hover:text-blue-400 transition-colors duration-300'>
                  Tình cảm
                </a>
              </li>
              <li>
                <a href='/the-loai/hai-huoc' className='hover:text-blue-400 transition-colors duration-300'>
                  Hài hước
                </a>
              </li>
              <li>
                <a href='/the-loai/kinh-di' className='hover:text-blue-400 transition-colors duration-300'>
                  Kinh dị
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className='flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-blue-400'>Liên hệ</h3>
            <ul className='space-y-2'>
              <li className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-2 text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                contact@mephim.com
              </li>
              <li className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-2 text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
                +84 123 456 789
              </li>
              <li className='flex items-center'>
                <svg
                  className='w-5 h-5 mr-2 text-blue-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
                123 Đường ABC, Quận XYZ, TP. HCM
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='mx-auto p-4 text-center text-sm text-gray-400'>© 2024 Mephim. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
