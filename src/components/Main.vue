<template>
  <div class="main-container">
    <!-- 상단 네비게이션 바 -->
    <nav class="navbar">
      <router-link to="/" class="logo-link">
        <img :src="logoCharacter" alt="Just Eat It 로고" class="nav-logo">
      </router-link>
      <div class="nav-links">
        <div class="nav-item">식단 추천</div>
        <div class="nav-item">식단 일기</div>
        <div class="nav-item">영양 진단기</div>
      </div>
      <div class="search-container">
        <input type="text" placeholder="검색어를 입력하세요" class="search-input" v-model="searchQuery" @keyup.enter="handleSearch">
        <img :src="searchIcon" alt="검색" class="search-icon" @click="handleSearch">
      </div>
      <router-link to="/login" class="login-btn">로그인</router-link>
    </nav>

    <!-- 메인 콘텐츠 -->
    <div class="content-wrapper">
      <div class="left-section">
        <!-- 메인 문구 -->
        <h1 class="main-title">JUST EAT IT과 함께 스마트한 식단관리를 시작하세요</h1>

        <!-- 식단 추천 섹션 -->
        <div class="meal-section">
          <h2 class="meal-title">
            <img :src="forkIcon" alt="포크 아이콘" class="fork-icon">
            오늘은 이 식단 어때요?
          </h2>
          
          <!-- 식단 캐러셀 -->
          <div class="carousel-container">
            <button class="nav-button prev" @click="prevSlide">
              <span class="nav-arrow">&#10094;</span>
            </button>
            
            <div class="carousel">
              <div class="meal-card" v-for="meal in meals" :key="meal.title">
                <img :src="meal.image" :alt="meal.title" class="meal-image">
                <h3 class="meal-name">{{ meal.title }}</h3>
                <p class="meal-description">{{ meal.description }}</p>
              </div>
            </div>

            <button class="nav-button next" @click="nextSlide">
              <span class="nav-arrow">&#10095;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 로그인 필요 모달 -->
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">×</button>
      <h2 class="modal-title">로그인이 필요합니다</h2>
      <p class="modal-body" translate="no">확인 버튼을 누르면 로그인페이지로 이동합니다.</p>
      <router-link to="/login">
        <button class="modal-confirm">확인</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import searchIcon from '../assets/searchIcon.png'
import forkIcon from '../assets/recommendIcon.png'
import logoCharacter from '../assets/logo.png'

export default {
  name: 'MainPage',
  data() {
    return {
      searchIcon,
      forkIcon,
      logoCharacter,
      searchQuery: '',
      meals: [
        { title: "고단백질 식단", description: "튼튼한 하루, 단백질로 시작!", image: '/src/assets/meals/고단백.png' },
        { title: "저염식 식단", description: "소금을 줄이고 삶을 더하다", image: '/src/assets/meals/저염식.png' },
        { title: "비건 식단", description: "자연을 담은 한 그릇", image: '/src/assets/meals/비건.png' },
        { title: "저당식 식단", description: "당 줄이고 활력 더하기!", image: '/src/assets/meals/저당식.png' },
        { title: "할랄 식단", description: "안심하고 즐기는 할랄 한끼", image: '/src/assets/meals/할랄.png' },
        { title: "다이어트 식단", description: "슬림한 몸매를 위한 최적의 식단!", image: '/src/assets/meals/다이어트.png' },
        { title: "벌크업 식단", description: "벌크업을 위한 고단백 식사", image: '/src/assets/meals/벌크업.png' },
        { title: "저지방식 식단", description: "기름기 없이, 부담 없이", image: '/src/assets/meals/저지방.png' },
        { title: "간헐적 단식 식단", description: "텀은 길게, 한 끼는 꽉 차게", image: '/src/assets/meals/간헐헐적.png' },
        { title: "키토제닉 식단", description: "키토 한 끼, 뇌도 몸도 가볍게", image: '/src/assets/meals/키토제닉.png' },
        { title: "콜레스테롤 제한 식단", description: "착한 식단이 좋은 혈관을 만든다", image: '/src/assets/meals/콜레스테롤.png' },
        { title: "속 편한 식단", description: "과민성 대장 증후군을 위한 식단", image: '/src/assets/meals/속 편한.png' },
        { title: "코셔식 식단", description: "율법을 담은 건강한 식단", image: '/src/assets/meals/코셔.png' }
      ],
      currentSlide: 0,
      isModalOpen: false
    }
  },
  mounted() {
    const carousel = document.querySelector('.carousel')
    if (carousel) {
      carousel.scrollLeft = 0
    }
  },
  methods: {
    prevSlide() {
      const carousel = document.querySelector('.carousel')
      carousel.scrollBy({ left: -300, behavior: 'smooth' })
    },
    nextSlide() {
      const carousel = document.querySelector('.carousel')
      carousel.scrollBy({ left: 300, behavior: 'smooth' })
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        // 검색 기능 제거
      }
    },
    showLoginRequiredModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 100%;
  min-height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Esamanru-Bold", sans-serif;
}

/* 네비게이션 바 스타일 */
.navbar {
  width: 100%;
  max-width: 1200px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  border-bottom: 1px solid #eee;
  margin: 0 auto;
  background-color: white;
  margin-top: 0;
}

.nav-links {
  display: flex;
  gap: 50px;
}

.nav-item {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 10px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #26FF00;
}

.search-container {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #000;
  border-radius: 20px;
  font-size: 16px;
  font-family: "Esamanru-Bold", sans-serif;
}

.search-input::placeholder {
  font-family: "Esamanru-Bold", sans-serif;
  color: #999;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.login-btn {
  padding: 10px 25px;
  background-color: #26FF00;
  color: white;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s;
  font-family: "Esamanru-Bold", sans-serif;
}

.login-btn:hover {
  background-color: #1fd800;
}

/* 콘텐츠 영역 스타일 */
.content-wrapper {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding: 0 40px;
}

.left-section {
  width: 100%;
  max-width: 1000px;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: left;
  font-family: "Esamanru-Bold", sans-serif;
}

.meal-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.meal-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin-bottom: 30px;
  font-family: "Esamanru-Bold", sans-serif;
}

.fork-icon {
  width: 30px;
  height: 30px;
}

/* 캐러셀 스타일 */
.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 120px;
}

.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 20px 0;
  width: 100%;
  justify-content: flex-start;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.meal-card {
  width: 220px;
  height: 300px;
  background: white;
  border: 2px solid #000;
  border-radius: 15px;
  padding: 10px;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0 15px;
}

.meal-card:hover {
  transform: translateY(-5px);
  border-color: #26FF00;
}

.meal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.meal-name {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: center;
  font-family: "Esamanru-Bold", sans-serif;
}

.meal-description {
  font-size: 12px;
  color: #666;
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Esamanru-Bold", sans-serif;
  line-height: 1.4;
}

.nav-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #26FF00;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #1fd800;
}

.nav-arrow {
  font-size: 20px;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  font-family: "Esamanru-Bold", sans-serif;
  animation: fadeIn 0.3s ease;
  text-align: center;
}

.modal-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  font-family: "Esamanru-Bold", sans-serif;
}

.modal-body {
  font-size: 16px;
  white-space: nowrap;
  font-family: "Esamanru-Bold", sans-serif;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.modal-confirm {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #26FF00;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: "Esamanru-Bold", sans-serif;
}

.modal-confirm:hover {
  background-color: #1ed100;
}

.nav-logo {
  width: 120px;
  height: auto;
  cursor: pointer;
}

.logo-link {
  text-decoration: none;
}
</style> 